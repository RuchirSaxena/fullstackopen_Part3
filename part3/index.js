const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');


//Implementing morgan
morgan.token('body', function (req, res) { return JSON.stringify( req.body) });

//Middleware
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-12345644",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Ruchir",
    number: "2984294",
    id: 5
  },
];

app.get('/', (req, res) => {
  res.send("App server is running");
});

app.get('/persons', (req, res) => {
  res.send(persons);
});

app.get('/persons/info', (req, res) => {
  console.log('info');
  let info = `<div>Phonebook has info for ${persons.length} people</div>
    <br/>
    <div> ${new Date()}</div>`;
  console.log(info);
  res.send(info);

});

app.get('/api/persons/:id', (req, res) => {
  console.log('test of browser');
  const id = Number(req.params.id);
  const personsData = persons.filter(person => person.id === id);
  if (personsData.length) {
    res.send(personsData);
  } else {
    res.status(404).end();
  }
});

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const filteredPersons = persons.filter(person => person.id !== id);
  persons = filteredPersons;
  res.status(204).end();
});

app.post('/persons', (req, res) => {
  console.log(req.body);
  const request = req.body;
  let isValid = {};
  if (!isEmpty(request.name)) {
    isValid.error = 'name must be not be empty';
  } else if (!isDuplicate(request.name, 'name')) {
    isValid.error = 'name must be unique';
  } else if (!isEmpty(request.number)) {
    isValid.error = 'number must be not be empty';
  }


  if (Object.keys(isValid).length) {
    res.status(400).json(isValid);
  }
  const newPerson = {
    name: request.name,
    number: request.number,
    id: getId()
  }
  persons = [...persons, newPerson];
  res.send(newPerson).status(200).end();
});

const getId = () => {
  return Math.floor(Math.random() * 200000);
};

const isEmpty = (data) => {
  let isValid = true;
  if (!data) {
    isValid = false
  }
  return isValid;
};

const isDuplicate = (data, propertyName) => {
  let isValid = true;
  const isExists = persons.filter(person => person[propertyName] === data);
  if (isExists.length) {
    isValid = false;
  }
  return isValid;
};


const port = 3003;
app.listen(3003);
console.log(`Server is running on port ${port}`);

