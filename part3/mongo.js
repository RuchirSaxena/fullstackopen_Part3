const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
console.log(password);

const name = process.argv[3];
const number = process.argv[4];

console.log(name, number);

const argumentsLength = process.argv.length;
console.log(argumentsLength);

const url = `mongodb+srv://ruchir:${password}@cluster0-ndyac.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('connection sucessful');


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const phonebookModel= mongoose.model('Phonebook', phonebookSchema);

const record = new phonebookModel({
    name: name,
    number: number
});

if (argumentsLength === 3) {
    phonebookModel
    .find({})
    .then(response => {
        let result = 'phonebook:\n';
        response.forEach(record =>{
            result +=`${record.name} ${record.number}\n`;
        });
        console.log(result);
        mongoose.connection.close();
        process.exit();
    });
   
}

record.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
})


