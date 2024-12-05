const User = require('../models/User')
const syncData = require('./syncData')


async function syncUserData() {
    try {

      await syncData('sync/user/', User);

      console.log('User data synced successfully!');
    } catch (error) {
      console.error('Error syncing User data:', error.message);
    }
  }

module.exports = syncUserData