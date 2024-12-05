const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const Department = require('../models/Department')
const syncData = require('./syncData')


async function syncPrescriptionData() {
    try {

      await syncData('sync/department/', Department);
      await syncData('sync/doctor/', Doctor);
      await syncData('sync/patient/', Patient);

      console.log('Prescription data synced successfully!');
    } catch (error) {
      console.error('Error syncing prescription data:', error.message);
    }
  }

module.exports = syncPrescriptionData