const multer = require('multer');


const upload = multer();


const handleFormData = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PATCH') {
    upload.none()(req, res, next);
  } else {
    next(); 
  }
};

module.exports = handleFormData;