const express = require("express");
const authenticate = require("../middlewares/authenticate");
const GenericController = require("../utils/genericController");
const Prescription = require("../models/Prescription");
const PrescriptionThrough = require("../models/PrescriptionThrough");
const {
  getPrescriptionItems,
  modifyPrescriptionThroughBody,
  modifyPrescriptionAfter,
} = require("../controllers/prescriptionController");
const Department = require("../models/Department");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Medicine = require("../models/Medicine");
const router = express.Router();

const PrescriptionIncludes = [
  { model: Department, as: "department_id" },
  { model: Patient, as: "patient" },
  { model: Doctor, as: "doctor" },
  {
    model: User,
    as: "user",
    attributes: ["id", "username", "first_name", "last_name"],
  },
];

const PrescriptionTroughIncludes = [{ model: Medicine, as: "medicine" }];

router.post(
  "/prescription",
  authenticate,
  GenericController.handleCreate(Prescription, true),
  modifyPrescriptionAfter
);
router.get(
  "/prescriptions",
  authenticate,
  GenericController.handleGetAll(Prescription, {
    include: PrescriptionIncludes,
  })
);
router.get(
  "/prescription/:id",
  authenticate,
  GenericController.handleGetById(Prescription, {
    include: PrescriptionIncludes,
  })
);
router.patch(
  "/prescription/:id",
  authenticate,
  GenericController.handleUpdate(Prescription)
);
router.delete(
  "/prescription/:id",
  authenticate,
  GenericController.handleDelete(Prescription)
);

router.get(
  "/prescriptions/last",
  authenticate,
  GenericController.handleLast(Prescription, { include: PrescriptionIncludes })
);
router.get(
  "/prescription/previous/:id",
  authenticate,
  GenericController.handlePrevious(Prescription, {
    include: PrescriptionIncludes,
  })
);
router.get(
  "/prescription/next/:id",
  authenticate,
  GenericController.handleNext(Prescription, { include: PrescriptionIncludes })
);

router.post(
  "/prescription-through",
  authenticate,
  modifyPrescriptionThroughBody,
  GenericController.handleCreate(PrescriptionThrough)
);
router.get(
  "/prescription-throughs",
  authenticate,
  GenericController.handleGetAll(PrescriptionThrough, {
    include: PrescriptionTroughIncludes,
  })
);
router.get(
  "/prescription-through/:id",
  authenticate,
  GenericController.handleGetById(PrescriptionThrough, {
    include: PrescriptionTroughIncludes,
  })
);
router.patch(
  "/prescription-through/:id",
  authenticate,
  modifyPrescriptionThroughBody,
  GenericController.handleUpdate(PrescriptionThrough)
);
router.delete(
  "/prescription-through/:id",
  authenticate,
  GenericController.handleDelete(PrescriptionThrough)
);
router.get(
  "/prescription-through/",
  authenticate,
  getPrescriptionItems
);

module.exports = router;
