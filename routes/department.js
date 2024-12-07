const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const GenericController = require("../utils/genericController");
const Department = require("../models/Department");

router.get('/department', authenticate, GenericController.handleGetAll(Department))
router.get('/department/:id', authenticate, GenericController.handleGetById(Department))

module.exports = router;