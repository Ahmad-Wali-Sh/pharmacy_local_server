const { Op } = require("sequelize");
const Medicine = require("../models/Medicine");
const downloadAndSaveImage = require("../utils/downloadAndSaveImage");

async function syncMedicineImages() {
  const medicines = await Medicine.findAll({
    where: { image: null, image_path: { [Op.not]: null } },
  });

  for (const medicine of medicines) {
    try {
      await downloadAndSaveImage(
        medicine.image_path, 
        Medicine, 
        medicine.id, 
        "medicine_images" 
      );
    } catch (error) {
      throw error
    }
  }
}

module.exports = syncMedicineImages;
