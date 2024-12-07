const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { getOfflineMedicines } = require('../controllers/medicineController');

router.get('/medician', authenticate, async (req, res) => {
    try {
      const filters = req.query;  
      const medicines = await getOfflineMedicines(filters);
      res.json(medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error.message);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

module.exports = router