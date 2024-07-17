const dotenv = require('dotenv').config({ path: './Config/Config.env' })

const express = require('express');
const connectToDatabase = require('./Database/Database');
const app = express();

const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes Import
const authenticationRoute = require('./Routes/Authentication.routes');
const categoryRoute = require('./Routes/Category.routes')

// Route Declaration
app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/category', categoryRoute);

const port = process.env.PORT || 5000

connectToDatabase().then(() =>
    app.listen(port, () => {
        console.log('Jay Shree Ram');
    })
)
