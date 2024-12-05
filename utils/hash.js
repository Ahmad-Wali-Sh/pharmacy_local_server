const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => bcrypt.hash(password, 10);

exports.comparePasswords = async (password, hash) => bcrypt.compare(password, hash);