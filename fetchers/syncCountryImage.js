const { Op } = require("sequelize");
const Country = require("../models/Country");
const downloadAndSaveImage = require("../utils/downloadAndSaveImage");

async function syncCountryImage() {
  const countries = await Country.findAll({
    where: { image: null, image_path: { [Op.not]: null } },
  });

  for (const country of countries) {
    try {
      await downloadAndSaveImage(
        country.image_path, 
        Country, 
        country.id, 
        "country_images" 
      );
    } catch (error) {
      throw error
    }
  }
}

module.exports = syncCountryImage;