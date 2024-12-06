const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const GenericController = require("../utils/genericController");
const Department = require("../models/Department");

router.get('/api/department', authenticate, GenericController.handleGetAll(Department))

module.exports = router;