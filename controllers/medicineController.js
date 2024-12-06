const Medicine = require('../models/Medicine')
const Kind = require('../models/Kind')
const PharmGroup = require('../models/PharmGroup')
const Country = require('../models/Country')
const MedicineBarcode = require('../models/MedicineBarcode')
const MedicineWith = require('../models/MedicineWith')
const { Op } = require('sequelize'); 
const BigCompany = require('../models/BigCompany')

async function getOfflineMedicines(filters) {
  try {
    const whereClause = {}; 
    
    if (filters.brand_name) {
      whereClause.brand_name = { [Op.like]: `%${filters.brand_name}%` }; 
    }
    if (filters.generic_name) {
      const genericNames = filters.generic_name.split(',');

      whereClause.generic_name = {
        [Op.and]: genericNames.map((name) => ({
          [Op.like]: `%${name}%`,
        })),
      };
    }
    if (filters.ml) {
      whereClause.ml = { [Op.like]: `%${filters.ml}%`}
    }
    if (filters.country) {
      whereClause['$Country.name$'] = { [Op.like]: `${filters.country}%` }; 
    }
    if (filters.big_company) {
      whereClause['$BigCompany.name$'] = { [Op.like]: `${filters.big_company}%` };  
    }
    if (filters.kind_persian) {
      whereClause['$Kind.name_persian$'] = { [Op.like]: `${filters.kind_persian}%`}
    }
    if (filters.kind_english) {
      whereClause['$Kind.name_english$'] = { [Op.like]: `${filters.kind_english}%`}
    }
    if (filters.active !== undefined) {
      whereClause.active = filters.active === 'true';  
    }

    const medicines = await Medicine.findAll({
      where: whereClause,
      include: [
        { model: Kind},
        { model: PharmGroup},
        { model: Country},
        { model: BigCompany},
        { model: MedicineBarcode, as: 'barcodes' },
      ],
    });
    const formattedMedicines = medicines.map((medicine) => {
      const { Kind, PharmGroup, Country, barcodes, generic_name, BigCompany, ...rest } = medicine.toJSON();
      return {
        ...rest,
        kind: Kind || null,
        pharm_group: PharmGroup || null,
        country: Country || null,
        barcodes: barcodes || [],
        big_company: BigCompany || null,
        generic_name: generic_name ? generic_name.split(',') : [],
      };
    });

    return formattedMedicines;
  } catch (error) {
    console.error('Error fetching offline medicines:', error.message);
    return [];
  }
}

module.exports = { getOfflineMedicines }