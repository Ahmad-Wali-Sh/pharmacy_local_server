const { Op } = require("sequelize");
const Kind = require("../models/Kind");
const downloadAndSaveImage = require("../utils/downloadAndSaveImage");

async function syncKindImage() {
  const kinds = await Kind.findAll({
    where: { image: null, image_path: { [Op.not]: null } },
  });

  for (const kind of kinds) {
    try {
      await downloadAndSaveImage(
        kind.image_path, 
        Kind, 
        kind.id, 
        "kind_images" 
      );
    } catch (error) {
        throw error
    }
  }
}

module.exports = syncKindImage;