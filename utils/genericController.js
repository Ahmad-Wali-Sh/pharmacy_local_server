const { Op } = require("sequelize");

const handleCreate =
  (model, after = false) =>
  async (req, res, next) => {
    try {
      let data = req.body;
      data.user_id = req.user.id; // If you want to attach the logged-in user
      const record = await model.create(data);

      if (after) {
        req.record = record
        next();
      } else {
        res.status(201).json(record);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const handleGetAll = (model, options={}) => async (req, res) => {
  try {
    const records = await model.findAll({
      ...options
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetById = (model, options={}) => async (req, res) => {
  try {
    const { id } = req.params;
    const record = await model.findOne({ where: { id }, ...options });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleUpdate = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;
    const record = await model.findOne({ where: { id } });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.update(data);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDelete = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    const record = await model.findOne({ where: { id } });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleLast = (model) => async (req, res) => {
  try {
    const lastRecord = await model.findOne({
      order: [["id", "DESC"]], // Order by 'id' descending to get the last one
    });

    if (!lastRecord) {
      return res.status(404).json({ message: "No records found" });
    }

    res.status(200).json(lastRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handlePrevious = (model) => async (req, res) => {
  try {
    const { id } = req.params;

    // Find the current record
    const currentRecord = await model.findOne({ where: { id } });

    if (!currentRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Get the previous record based on the 'id'
    const previousRecord = await model.findOne({
      where: { id: { [Op.lt]: id } }, // Get the record with a smaller ID
      order: [["id", "DESC"]], // Order by 'id' descending
    });

    if (!previousRecord) {
      return res.status(404).json({ message: "No previous record found" });
    }

    res.status(200).json(previousRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleNext = (model) => async (req, res) => {
  try {
    const { id } = req.params;

    // Find the current record
    const currentRecord = await model.findOne({ where: { id } });

    if (!currentRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Get the next record based on the 'id'
    const nextRecord = await model.findOne({
      where: { id: { [Op.gt]: id } }, // Get the record with a larger ID
      order: [["id", "ASC"]], // Order by 'id' ascending
    });

    if (!nextRecord) {
      return res.status(404).json({ message: "No next record found" });
    }

    res.status(200).json(nextRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreate,
  handleGetAll,
  handleGetById,
  handleUpdate,
  handleDelete,
  handleLast,
  handlePrevious,
  handleNext,
};
