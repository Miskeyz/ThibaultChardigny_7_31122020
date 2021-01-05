import axios from 'axios';

export const fetchPost = (data, target) => {
    axios.post('http://localhost:3000/api' + target, 
    { data });

