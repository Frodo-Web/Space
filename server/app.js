require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require("mongoose");
const { initializeMongoServer } = require('./db/mongoConfigTesting.js');
const historyAPIfallback = require("./middleware/historyAPIfallback");


const port = process.env.PORT || 3000;

initializeMongoServer();

const app = express();
app.use(cookieParser());
const publicDirectory = path.join(__dirname, '/../client/public');

app.use(express.static(publicDirectory));
app.use(historyAPIfallback);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/space', require('./routes/space'));

app.listen(port, function () {
	console.log(`listening on port ${port}`);
});
