const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res)=>{ res.send("App started.")});

app.listen(PORT, () => {

    console.log("Server is listening on port "+PORT);
});
