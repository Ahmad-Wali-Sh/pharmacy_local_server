const Kind = require("../models/Kind");
const Country = require("../models/Country");
const BigCompany = require("../models/BigCompany");
const PharmGroup = require("../models/PharmGroup");
const MedicineWith = require("../models/MedicineWith");
const MedicineBarcode = require("../models/MedicineBarcode");
const Medicine = require("../models/Medicine");
const syncData = require("./syncData");
const axios = require("axios");
const { getBackendUrl } = require("../utils/findBackendUrl");

async function syncMedicineData() {
  try {
    await syncData("sync/kind/", Kind);
    await syncData("sync/country/", Country);
    await syncData("sync/big-company/", BigCompany);
    await syncData("sync/pharm-group/", PharmGroup);
    await syncData("sync/medicine/", Medicine);
    await syncData("sync/medicine-barcode/", MedicineBarcode);

    try {
      const medicineWithResponse = await axios.get(
        getBackendUrl() + "sync/medicine-with/"
      );
      const records = medicineWithResponse.data;
      for (const record of records) {
        const { medicine, additional } = record;
        additional?.map((addId) => {
          MedicineWith.upsert({
            medicine: medicine,
            additional: addId,
          });
          return;
        });
      }

      console.log(`MedicineWith data synced successfully!`);
    } catch (error) {
      console.error(`Error syncing Medicine data:`, error.message);
    }

    console.log("Medicine data synced successfully!");
  } catch (error) {
    console.error("Error syncing Medicine data:", error.message);
  }
}

module.exports = syncMedicineData;
