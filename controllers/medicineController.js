const Medicine = require('../models/Medicine')
const Kind = require('../models/Kind')
const PharmGroup = require('../models/PharmGroup')
const Country = require('../models/Country')
const MedicineBarcode = require('../models/MedicineBarcode')
const MedicineWith = require('../models/MedicineWith')

async function getOfflineMedicines() {
    try {
      const medicines = await Medicine.findAll({
        include: [
          { model: Kind },
          { model: PharmGroup },
          { model: Country },
          { model: MedicineBarcode },
          { model: MedicineWith, as: 'addMedicine' },
        ],
      });
      return medicines;
    } catch (error) {
      console.error('Error fetching offline medicines:', error.message);
      return [];
    }
  }

module.exports = { getOfflineMedicines }