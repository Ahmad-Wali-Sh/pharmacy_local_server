const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const PrescriptionThrough = require('../models/PrescriptionThrough');


exports.getPrescriptionItems = async (req, res) => {
    try {
        const { prescription_id } = req.params;
        const prescriptionThroughs = await PrescriptionThrough.findAll({ where: { prescription_id }})
        res.status(202).json(prescriptionThroughs)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

