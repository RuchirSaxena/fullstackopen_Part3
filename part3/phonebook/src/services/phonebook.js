import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (newPhoneRecord) => {
    const request = axios.post(baseUrl, newPhoneRecord);
    return request.then(response => response.data)
}

const update = (id, newPhoneRecord) => {
    const request = axios.put(`${baseUrl}/${id}`, newPhoneRecord);
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}

export {
    getAll, create, update, remove
};



