const downloadImage = async (url, localPath) => {
    const response = await axios({ url, responseType: 'stream' });
    const writer = fs.createWriteStream(localPath);
  
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  };
