import React from 'react'

const Notification = ({ message,type='success' }) => {
    if (!message) {
        return null;
    }
    const color = type === 'success' ? 'green' : 'red';
    const errorNotifcation ={
         backgroundColor: '#cbd5cb',
         fontSize: 22,
         padding: 5,
         border: `4px ${color} solid`,
         color: color,
         borderRadius: 6,
    };
    return (
        <div style={errorNotifcation}>
            {message}
        </div>
    )
}

export default Notification;