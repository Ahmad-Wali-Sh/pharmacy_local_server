const bonjour = require("bonjour")();
let backendUrl = null;

function setBackendUrl(url) {
  backendUrl = url;
}

function getBackendUrl() {
  if (!backendUrl) {
    throw new Error("Backend URL is not yet initialized.");
  }
  return backendUrl;
}

function findBackendUrl() {
  return new Promise((resolve, reject) => {
    bonjour.findOne({ type: "http" }, function (service) {
      if (!service) {
        return reject(new Error("No service found"));
      }
      const url = `http://${service.referer.address}:${service.port}/api/`;
      setBackendUrl(url);
      console.log('Backend URL set:', url)
      resolve(url); // Resolve the promise with the backend URL
    });
  });
}

module.exports = { findBackendUrl, getBackendUrl };