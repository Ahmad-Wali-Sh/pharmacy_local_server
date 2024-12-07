const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const GenericController = require("../utils/genericController");
const Patient = require("../models/Patient");

router.get('/patient', authenticate, GenericController.handleGetAll(Patient))
router.get('/patient/:id', authenticate, GenericController.handleGetById(Patient))

module.exports = router;