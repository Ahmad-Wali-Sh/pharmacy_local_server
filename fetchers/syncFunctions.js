const { findBackendUrl } = require("../utils/findBackendUrl");
const syncMedicineData = require("./syncMedicineData");
const syncPrescriptionData = require("./syncPrescriptionData");
const syncUserData = require("./syncUserData");

const syncData = () => {
  findBackendUrl()
    .then(() => {
      console.log("Starting syncing...");
      syncUserData()
        .then(() => console.log("initail user data sync completed!"))
        .catch((err) => console.log("Error in Caching User Data!"));

      syncMedicineData()
        .then(() =>
          console.log("Initial syncMedicineData completed successfully")
        )
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
};
module.exports = { syncMedicineData, syncPrescriptionData, syncData };
