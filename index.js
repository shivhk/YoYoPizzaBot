const express = require('express');
const bodyParser = require('body-parser');
const PORT =process.env.PORT|| 5000;
global.include = PORT;
const app = express();
const connectDB = require('./config/db');
const path = require('path');

//connect database
connectDB();
global.include = file => require(path.resolve(file));
global.config = include('config/default');

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/')))
app.use(bodyParser.json())
app.get('/', (req, res)=>{ res.sendFile(path.join(__dirname, 'index.html'));});

app.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});


module.exports.port = PORT;

include('routes/orderRoutes.js')(app);
include('routes/MenuRoutes.js')(app);
