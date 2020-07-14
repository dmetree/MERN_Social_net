const express = require('express');
const connetDB = require('./config/db')

const app = express();
// connet Database
connetDB();

// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API runnig')); 

// Define routs
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));