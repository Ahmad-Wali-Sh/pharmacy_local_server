const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const GenericController = require("../utils/genericController");
const Doctor = require("../models/Doctor");

router.get('/doctor', authenticate, GenericController.handleGetAll(Doctor))
router.get('/doctor/:id', authenticate, GenericController.handleGetById(Doctor))

module.exports = router;