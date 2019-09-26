import React  from 'react';

const Phonebook = ({id, name, phoneNumber, deletePhoneRecord }) => {
  return (
    <div>
      <span>{name}&nbsp;</span>
      <span>{phoneNumber}</span>
      <input type='button' value='delete' onClick={() => deletePhoneRecord(id)} />
    </div>
  )
};

export default Phonebook;