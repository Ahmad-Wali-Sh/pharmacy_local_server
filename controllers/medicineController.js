const Medicine = require('../models/Medicine')
const Kind = require('../models/Kind')
const PharmGroup = require('../models/PharmGroup')
const Country = require('../models/Country')
const MedicineBarcode = require('../models/MedicineBarcode')
const MedicineWith = require('../models/MedicineWith')

async function getOfflineMedicines(filters) {
  try {
    const whereClause = {}; 
    
    if (filters.brand_name) {
      whereClause.brand_name = filters.brand_name;
    }
    if (filters.generic_name) {
      whereClause.generic_name = { [Sequelize.Op.contains]: filters.generic_name }; 
    }
    if (filters.country) {
      whereClause.country = filters.country;
    }
    if (filters.pharm_group) {
      whereClause.pharm_group = filters.pharm_group;
    }
    if (filters.kind) {
      whereClause.kind = filters.kind;
    }
    if (filters.active !== undefined) {
      whereClause.active = filters.active === 'true';  
    }
    if (filters.price) {
      whereClause.price = { [Sequelize.Op.lte]: filters.price }; 
    }
    if (filters.min_existence) {
      whereClause.existence = { [Sequelize.Op.gte]: filters.min_existence };
    }

    // Get the filtered medicines
    const medicines = await Medicine.findAll({
      where: whereClause,
      include: [
        { model: Kind },
        { model: PharmGroup },
        { model: Country },
        { model: MedicineBarcode, as: 'barcodes' },
      ],
    });
    console.log(medicines)

    return medicines;
  } catch (error) {
    console.error('Error fetching offline medicines:', error.message);
    return [];
  }
}

module.exports = { getOfflineMedicines }