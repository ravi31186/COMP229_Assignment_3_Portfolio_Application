const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const contactsRoute = require('./routes/contactsRoute');
const usersRoute = require('./routes/usersRoute');


const app = express();

const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Lab_Assignment_3', {

 useNewUrlParser: true,

 useUnifiedTopology: true,

});

mongoose.connection.once('open', () => {

 console.log('Connected to MongoDB');

});


app.use('/api/contacts', contactsRoute);
app.use('/api/users', usersRoute)


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));