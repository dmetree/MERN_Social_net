const express = require('express');
const connetDB = require('./config/db')

const app = express();
// connet Database
connetDB();

app.get('/', (req, res) => res.send('API runnig')); 

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));