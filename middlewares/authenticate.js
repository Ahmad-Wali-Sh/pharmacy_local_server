const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        const { username, password } = req.headers;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};