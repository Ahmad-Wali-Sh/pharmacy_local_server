const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadAndSaveImage(imageUrl, model, recordId, staticDir) {
  try {
    const fileExtension = path.extname(new URL(imageUrl).pathname);

    const staticPath = path.resolve(process.cwd(), 'static/' + staticDir);

    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(staticPath, { recursive: true });
    }

    const fileName = `${recordId}${fileExtension}`;
    const filePath = path.join(staticPath, fileName);

    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);


    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const updatedRecord = await model.update(
      { image: `http://127.0.0.1:4000/static/${staticDir}/${fileName}` },
      { where: { id: recordId } }
    );


    return updatedRecord;
  } catch (error) {
    throw error;
  }
}

module.exports = downloadAndSaveImage;