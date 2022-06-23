const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

const public = path.join(__dirname + '/../client/public');

app.use(express.static(public));
app.use(express.json());

app.get('/', function(request, response){
	response.json('Hello!!');
});

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});
