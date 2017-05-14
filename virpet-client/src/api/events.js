import axios from 'axios';

// Develop server URL
const eventBaseUrl = 'http://localhost:8080/api';

export function listEvents(unaccomplishedOnly, searchText, showDays) {

    let url = `${eventBaseUrl}/events`;
    if (searchText)
        url += `?searchText=${searchText}`;
    if (unaccomplishedOnly)
        url += `?accomplishTodo=${unaccomplishedOnly}`;
    if (unaccomplishedOnly && searchText)
        url = `${eventBaseUrl}/events?accomplishTodo=${unaccomplishedOnly}&searchText=${searchText}`;
    if (!unaccomplishedOnly && !searchText)
    	url += `?showDays=${showDays}`;
    else
        url += `&showDays=${showDays}`;

    console.log(url);
    return axios.get(url).then(function(res) {
     if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        console.log('ListEvent in api received :');
        console.log(res.data);
        return res.data;
    });
}
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript) {
    let url = `${eventBaseUrl}/events`;

    // console.log(`Making POST request to: ${url}`);
    // console.log('API.eventTitle = ' + eventTitle);
    // console.log('API.eventStartDate = ' + eventStartDate);
    // console.log('API.eventEndDate = '+ eventEndDate);
    // console.log('API.eventDescript = '+ eventDescript);
    return axios.post(url, {
        eventTitle,
        eventStartDate,
        eventEndDate,
        eventDescript
    }).then(function(res) {
        console.log('client recieved:');
        console.log(res.data);
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
export function accomplishEvent(id) {
	let url = `${eventBaseUrl}/events/${id}`;

    // console.log(`Making POST request to: ${url}`);
	console.log(`In accomplishEvent : ${url}`);
	return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
