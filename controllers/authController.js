const axios = require("axios");
const { syncData } = require("../fetchers/syncFunctions");
const { findBackendUrl, getBackendUrl } = require('../utils/findBackendUrl');

let token = null;
let syncInterval = null;

exports.setToken = async (req, res) => {
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
