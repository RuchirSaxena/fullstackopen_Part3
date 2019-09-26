import React, { useState, useEffect } from 'react';
import Phonebook from './Phonebook';
import PhoneBookForm from './PhoneBookForm';
import Filter from './Filter';
import { getAll, create, update, remove}  from '../services/phonebook';
import Notification from './Notification';
const uuidV4 = require('uuid.v4');


const App = () => {
  const [phonebook, setPhonebookRecord] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotifiactionMessage] = useState('');
  const [notificationType, setNotifiactionType] = useState('');

  useEffect(() => {
    getPersonsData();
  }, []);

  const getPersonsData = () => {
    getAll()
        .then(response => {
        setPhonebookRecord(response);
      }).catch(err => console.log(err));
  }

  const handleNameChange = (event) => {
    const name = event.target.value.trim();
    setNewName(name);
  };

  const handlePhoneChange = (event) => {
    const number = event.target.value.trim();
    setNewNumber(number);
  };

 
  const handleDeletePhonebookRecord = (id) => {
    const phonebookRecord = phonebook.find(record => record.id === id);
    const isDelete = window.confirm(`Delete ${phonebookRecord.name} ?`);
    if (isDelete) {
      const copy = phonebook.filter(record => record.id !== id);
      remove(phonebookRecord.id).then(response => setPhonebookRecord(copy))
      .catch(err => setNotifiactionInfo((`Information of ${phonebookRecord.name} has already been removed from server`),'failure'))
    }
  };

  const showPhonebook = () => {
    return phonebook.map(record => {
      return (<Phonebook key={record.id} id={record.id} name={record.name} phoneNumber={record.number} deletePhoneRecord={handleDeletePhonebookRecord} />);
    });
  }

  const handleAddPhoneRecord = (event) => {
    event.preventDefault();
    const phonebookRecord = phonebook.filter(record => record.name === newName);
    if (phonebookRecord.length) {
      //alert(`${newName} is already added to phonebook`);
      const response = window.confirm(`${newName} has already been added to the phonebook, replace the old number with new number?`)
      if (response) {
        const updatedPhoneRecord = {
          name: newName,
          number: newPhoneNumber,
          id: phonebookRecord[0].id
        };
        updatePhoneBook(phonebookRecord[0].id, updatedPhoneRecord);
     
      }
        resetForm();
        return;
    }

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
      id: uuidV4(),
    };
    resetForm();
    create(newPerson).then(returnedRecord => {
      setPhonebookRecord(phonebook.concat(returnedRecord))
      setNotifiactionInfo((newName + " added"), 'success')
    })
    .catch(err => console.log(err));
  }

 
  const updatePhoneBook = (id, record) => {
    update(id, record).then(updatedRecord => {
      console.log(updatedRecord);
     // setPhonebookRecord(phonebook.map(record => record.id !== id ? record : updatedRecord));
     setPhonebookRecord(updatedRecord);
    }).catch(err => console.log(err));

  }

  const handleSearch = (event) => {
    const searchCriteria = event.target.value.trim();
    const searchResults = phonebook.filter(person => person.name.trim().toLowerCase().includes(searchCriteria.toLowerCase()));
    if (searchResults.length && searchCriteria) {
      setPhonebookRecord(searchResults);
    } else {
      getPersonsData();
    }

  }

   const resetForm = () =>{
      setNewName('');
      setNewNumber('');
   }

   const setNotifiactionInfo =(notificationMessage,notificationType)=>{
     setNotifiactionMessage(notificationMessage);
     setNotifiactionType(notificationType);
   }

  return (
    <div>
      <h2>Phonebook</h2>
      
    <h2> <Notification message={notificationMessage} type={notificationType} /> </h2>

      <Filter handleSearch={handleSearch} />
      
      <h2>add a new</h2>

      <PhoneBookForm
        name={newName}
        phoneNumber={newPhoneNumber}
        nameChange={handleNameChange}
        phoneChange={handlePhoneChange}
        addPhoneRecord={handleAddPhoneRecord}
      />

      <h3>Numbers</h3>

      {showPhonebook()}

    </div>
  )
};

export default App;