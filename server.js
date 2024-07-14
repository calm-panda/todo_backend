const express = require('express');
const tasks = require('./routes/tasks');
const auth = require('./routes/jwt');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use('/tasks', tasks);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('<p>Hello from server</p>');
});

app.listen(port, () => {
    console.log(`Live on http://localhost:${port}`);
});