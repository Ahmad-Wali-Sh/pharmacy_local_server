const axios = require("axios");
const { syncData } = require("../fetchers/syncFunctions");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const isPasswordValid = require("../utils/isPasswordValid");

let token = null;
let syncInterval = null;

exports.setDjangoToken = async (req, res) => {
    const { token: receivedToken } = req.body;
    if (!receivedToken) {
      return res.status(400).json({ error: "Token is required" });
    }
    try {
      token = receivedToken;
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      if (syncInterval) {
        clearInterval(syncInterval);
      }
  
      const intervalInMs = 30 * 60 * 100* 2000;
      syncData();
      syncInterval = setInterval(syncData, intervalInMs);
      return res
        .status(200)
        .json({ message: "Token set and sync started successfully" });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Invalid token or authentication failed" });
    }
}


exports.loginController = async (req, res) => {
  const { username, password} = req.body

  try {
    const user = await User.findOne({ where: { username }})

    if (!user) {
      return res.status(404).json({message: 'User Not Found'})
    }

    if (!isPasswordValid(password, user.password)) {
      return res.status(403).json({message: 'Invalid Credentials.'})
    }

    if (!user.django_token) {
      const expressToken = generateToken(user.username);
      await user.update({ express_token: expressToken})
      const user_detail = await User.findOne({ where: { id: user.id}, attributes: ['username', 'first_name', 'last_name', 'id', 'permissions']})
      return res.json({token: expressToken, message: 'Logged in using Express', user: user_detail})
    }
    const user_detail = await User.findOne({ where: { id: user.id}, attributes: ['username', 'first_name', 'last_name', 'id', 'permissions']})
    return res.json({ token: user.django_token, message: 'Logged in using Django token.', user: user_detail})
  } catch (err) {
    res.status(500).json({message: 'Login Failed', error: err.message})
  }
}