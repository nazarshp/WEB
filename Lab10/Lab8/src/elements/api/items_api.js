import axios from 'axios';

const axiosInit = axios.create({
	baseURL: "http://localhost:5050/api/v2/devices",
	headers: {
		"Content-Type": "application/json",
	},
});

export const getItems = async (params = {}) =>{
	let answer = await axios.get('http://localhost:5050/api/v2/devices', { params });
	answer = answer.data;
	console.log(answer);
	return answer;
};

export const getItemById = async (id) => {
	console.log(id);
	return (await axiosInit.get(`/${id}`)).data;
};
