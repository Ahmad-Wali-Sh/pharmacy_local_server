const express = require('express');
const authenticate = require('../middlewares/authenticate');
const GenericController = require('../utils/genericController')
const Prescription = require('../models/Prescription')
const PrescriptionThrough = require('../models/PrescriptionThrough')
const { getPrescriptionItems} = require('../controllers/prescriptionController')
const router = express.Router();

router.post('/prescription', authenticate, GenericController.handleCreate(Prescription));
router.get('/prescriptions', authenticate, GenericController.handleGetAll(Prescription));
router.get('/prescription/:id', authenticate, GenericController.handleGetById(Prescription));
router.patch('/prescription/:id', authenticate, GenericController.handleUpdate(Prescription));
router.delete('/prescription/:id', authenticate, GenericController.handleDelete(Prescription));


router.get('/prescriptions/last', authenticate, GenericController.handleLast(Prescription));
router.get('/prescription/previous/:id', authenticate, GenericController.handlePrevious(Prescription));
router.get('/prescription/next/:id', authenticate, GenericController.handleNext(Prescription));

router.post('/prescription-through', authenticate, GenericController.handleCreate(PrescriptionThrough));
router.get('/prescription-throughs', authenticate, GenericController.handleGetAll(PrescriptionThrough));
router.get('/prescription-through/:id', authenticate, GenericController.handleGetById(PrescriptionThrough));
router.patch('/prescription-through/:id', authenticate, GenericController.handleUpdate(PrescriptionThrough));
router.delete('/prescription-through/:id', authenticate, GenericController.handleDelete(PrescriptionThrough));
router.get('/prescription-throughs/:prescription_id', authenticate, getPrescriptionItems);

module.exports = router;