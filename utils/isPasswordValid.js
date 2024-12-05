const crypto = require('crypto');


const isPasswordValid = async (providedPassword, hashedPassword) => {
  const [algorithm, iterations, salt, hash] = hashedPassword.split('$');
  
  const computedHash = crypto.pbkdf2Sync(providedPassword, salt, parseInt(iterations), 64, 'sha256').toString('base64');
  
  return computedHash === hash;
};

module.exports = isPasswordValid