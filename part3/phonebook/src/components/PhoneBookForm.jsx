import React from 'react';

const PhoneBookForm =({ 
   name,
   phoneNumber,  
   nameChange, 
   phoneChange,
   addPhoneRecord }) => {
    return (
      <form>
        <div>
          name: <input value={name} onChange={nameChange} />
        </div>
        <div>number: <input value={phoneNumber} onChange={phoneChange} /></div>
        <div>
          <button type="submit" onClick={addPhoneRecord}>add</button>
        </div>
      </form>
    );
}

export default PhoneBookForm;