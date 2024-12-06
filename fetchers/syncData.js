const { getBackendUrl } = require('../utils/findBackendUrl')
const axios = require('axios')

async function syncData(endpoint, model) {
    try {
      const response = await axios.get(getBackendUrl() + endpoint);
      const records = response.data;
      for (const record of records) {
        if (record) {
          if (Array.isArray(record.generic_name)) {
            record.generic_name = record.generic_name.join(',');
          }
          await model.upsert(record);
        }
      }

  
      console.log(`${model.name} data synced successfully!`);
    } catch (error) {
      console.error(`Error syncing data for ${model.name}:`, error.message);
    }
  }

module.exports = syncData