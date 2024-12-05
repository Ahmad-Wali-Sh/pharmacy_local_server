const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');

exports.postPrescription = async (req, res) => {
    try {
        const { data } = req.body;
        const prescription = await Prescription.create(data);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.findAll({
            include: [
              { model: Patient },
              { model: Doctor },
              { model: Department },
            ],
          });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findOne({ where: { id: id }})
        res.status(202).json(prescription)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        await Prescription.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
