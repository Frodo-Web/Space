require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
const public = path.join(__dirname + '/../client/public');

app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index'));

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
