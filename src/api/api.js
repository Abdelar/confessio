import axios from './axios';

export const createMessage = message => {
	return axios.post('/post', message);
};
export const getMessages = id => {
	return axios.get('/postss' + (id ? '?last=' + id : ''));
};

export const getMessagesByTag = tag => {
	return axios.get(`/posts/${tag}`);
};
