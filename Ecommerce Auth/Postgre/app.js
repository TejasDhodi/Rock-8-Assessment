const dotenv = require('dotenv').config({ path: './Config/Config.env' });

const express = require('express');
const sequelize = require('./config/config');
const app = express();
const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes Import
const authenticationRoute = require('./routes/authentication.routes');
const categoryRoute = require('./routes/category.routes');

// Route Declaration
app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/category', categoryRoute);

const port = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });
