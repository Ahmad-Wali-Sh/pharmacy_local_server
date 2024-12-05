const jwt = require('jsonwebtoken');

function generateToken(username) {
  return jwt.sign({ username }, 'secret-token-generation', { expiresIn: '12h' });
}

module.exports = generateToken