import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchSignup = () => {
    axios.post(`${API_BASE_URL}/users`)
    .then(response => response.data);
};

