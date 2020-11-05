import axios from './axios';

export const createMessage = message => {
	return axios.post('/post', message);
};
export const getMessages = () => {
	return axios.get('/posts');
};
