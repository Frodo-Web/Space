require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const { initializeMongoServer } = require('./db/mongoConfigTesting.js');

const port = process.env.PORT || 3000;

initializeMongoServer();

const app = express();
const publicDirectory = path.join(__dirname + '/../client/public');

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, function () {
	console.log(`listening on port ${port}`);
});
