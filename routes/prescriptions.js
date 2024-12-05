const express = require('express');
const { postPrescription, getPrescriptions, deletePrescription, getPrescription } = require('../controllers/prescriptionController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', authenticate, postPrescription);
router.get('/',  authenticate, getPrescriptions);
router.get('/:id',  authenticate, getPrescription);
router.delete('/:id', authenticate, deletePrescription);

module.exports = router;