import axios from 'axios';
// const todoBaseUrl = 'http://weathermood-23.us-west-2.elasticbeanstalk.com/api';


const todoBaseUrl = 'http://localhost:8080/api'



export function listTodos(accomplishTodo = false,searchText = '') {
    let url = `${todoBaseUrl}/todos`;

	if (accomplishTodo)
		url += `?accomplishTodo=${accomplishTodo}`;

    if (searchText)
        url += `?searchText=${searchText}`;

	if (accomplishTodo && searchText)
		url = `${todoBaseUrl}/todos?accomplishTodo=${accomplishTodo}&searchText=${searchText}`;

	console.log(`In listTodo : ${url}`);
    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createTodo(mood, text) {
    let url = `${todoBaseUrl}/todos`;

    console.log(`In createTodo : ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}


export function accomplishTodo(id) {
	let url = `${todoBaseUrl}/todos/${id}`;

    // console.log(`Making POST request to: ${url}`);
	console.log(`In accomplishTodo : ${url}`);
	return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
