const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');


//Implementing morgan
morgan.token('body', (req, res) => (Object.keys(req.body).length === 0 ? 'No Params' : JSON.stringify(req.body)));

//Middleware
app.use(express.static('build'));
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
    number: "+91-9899435143",
    id: 5
  },
];

app.get('/', (req, res) => {
  res.send("App server is running");
});

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/api/persons/info', (req, res) => {
  const info = `<div>Phonebook has info for ${persons.length} people</div>
    <br/>
    <div> ${new Date()}</div>`;
  res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const personsData = persons.filter(person => person.id === id);
  if (personsData.length) {
    res.send(personsData);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const filteredPersons = persons.find(person => person.id === id);
  if(!filteredPersons){
    res.send({error:'Id does not exists'}).status(500).end();
  }
  const updateIndex = persons.findIndex(person => person.id === filteredPersons.id);
  persons.splice(updateIndex,1);
  res.status(204).end();
});

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const request = req.body;
  const updateRecord = [{
    name: request.name,
    number: request.number,
    id:id
  }];
  const filteredPersons = persons.find(person => person.id === id);
  const updateIndex = persons.findIndex(person => person.id === filteredPersons.id);
  persons.splice(updateIndex,1,...updateRecord);
  res.send(persons).status(200).end();
});

app.post('/api/persons', (req, res) => {
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


let PORT = process.env.PORT || 3003;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);

