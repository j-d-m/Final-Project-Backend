const { v4 } = require("uuid");
const ImagesCollection = require("../../models/imageSchema");
const handleFileUploadMongoDB = async (file) => {
  const { createReadStream, filename, mimetype } = await file;
  const key = v4();
  return new Promise(async (resolve, reject) => {
    try {
      const stream = createReadStream();
      let chunks = [];
      for await (let chunk of stream) {
        chunks.push(chunk);
      }
      const Image = new ImagesCollection({
        filename: `${key}_${filename}`,
        //**!this is broken image upload is not working and will be implemented ASAP.** */
        imageUrl: `https://staff-room.cyclic.app/db/images/${key}_${filename}`,
        // imageUrl: `http://localhost:5000/db/images/${key}_${filename}`,

        data: Buffer.concat(chunks),
      });
      await Image.save();
      resolve(Image);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = handleFileUploadMongoDB;
