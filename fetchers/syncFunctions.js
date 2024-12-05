const { findBackendUrl } = require("../utils/findBackendUrl");
const syncImages = require("./syncImages");
const syncMedicineData = require("./syncMedicineData");
const syncPrescriptionData = require("./syncPrescriptionData");
const syncUserData = require("./syncUserData");

async function syncData() {
   findBackendUrl()
    .then(() => {
      console.log("Starting syncing...");
      syncUserData()
        .then(() => console.log("initail user data sync completed!"))
        .catch((err) => console.log("Error in Caching User Data!"));

      syncMedicineData()
        .then(() => {
          console.log("Initial syncMedicineData completed successfully");
          syncImages().then(() => {
            console.log("images synced and downloaded succesfully!");
          });
        })
        .catch((err) =>
          console.error("Error in initial syncMedicineData:", err)
        );

      syncPrescriptionData()
        .then(() => console.log("syncPrescritpionData completed."))
        .catch((err) =>
          console.error("Error in initial syncPrescritpionData:", err)
        );


    })
    .catch(() => {
      console.log("server out of reach!");
    });
}
module.exports = { syncMedicineData, syncPrescriptionData, syncData };
