import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-17265.firebaseio.com/',
});

export default instance;
