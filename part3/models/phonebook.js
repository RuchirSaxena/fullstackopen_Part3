const mongoose = require('mongoose');
require('dotenv').config();


//Setting up mongoDB
const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('connected to MongoDB on server');
    })
    .catch(error => {
        console.log('error connecting to mongoDb', error.message);
    });

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const phonebookModel = mongoose.model('Phonebook', phonebookSchema);

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = phonebookModel;