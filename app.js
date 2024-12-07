const express = require('express');
const sequelize = require('./config/database');
const prescriptionRoutes = require('./routes/prescriptions');
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicine');
const departmentRoutes = require('./routes/department');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const { findBackendUrl } = require('./utils/findBackendUrl');
const path = require('path');
const cors = require('cors');
const handleFormData = require('./middlewares/handleFormData');


require('./models/Prescription');
require('./models/Medicine');


const app = express();

app.use(cors());
app.use(handleFormData); 

app.use(express.json());
app.use('/api', prescriptionRoutes);
app.use('/auth', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api', departmentRoutes);
app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/static', express.static(path.join(__dirname, 'static')));

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
    findBackendUrl()
      console.log(`Server is running on port ${PORT}`);
});

module.exports = app;