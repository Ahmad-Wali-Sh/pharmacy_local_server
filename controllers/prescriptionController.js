const Medicine = require('../models/Medicine');
const Prescription = require('../models/Prescription');
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


exports.modifyPrescriptionThroughBody = async (req, res, next) => {
    if (req.body) {
        const medicine = await Medicine.findOne({ where: { id: req.body.medician_id }})
        req.body.each_price = medicine.price
        req.body.total_price = req.body.each_price * (req.body.quantity || 1)
    }
    next();
};

exports.modifyPrescriptionAfter = async (req, res, next) => {
    if (req.record) {
        const prescription = await Prescription.findOne({ where: { id: req.record.id}})
        prescription.set({
            prescription_number: `offline-${prescription.id}`
        })
        res.status(202).json(prescription)
    }
}

