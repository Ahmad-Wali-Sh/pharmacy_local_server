const { Op } = require("sequelize");
const PharmGroup = require("../models/PharmGroup");
const downloadAndSaveImage = require("../utils/downloadAndSaveImage");

async function syncPharmGroupImage() {
  const pharms = await PharmGroup.findAll({
    where: { image: null, image_path: { [Op.not]: null } },
  });

  for (const pharm of pharms) {
    try {
      await downloadAndSaveImage(
        pharm.image_path, 
        PharmGroup, 
        pharm.id, 
        "pharm_group_images" 
      );
    } catch (error) {
        throw error
    }
  }
}

module.exports = syncPharmGroupImage;