const express = require('express');
const sequelize = require('./config/database');
const prescriptionRoutes = require('./routes/prescriptions');
const authRoutes = require('./routes/auth');
const { findBackendUrl } = require('./utils/findBackendUrl');

require('./models/Prescription');
require('./models/Medicine');


const app = express();

app.use(express.json());
app.use('/prescriptions', prescriptionRoutes);
app.use('/auth', authRoutes);

sequelize.sync({ alter: true, force: true })
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
    findBackendUrl()
      console.log(`Server is running on port ${PORT}`);
});

module.exports = app;