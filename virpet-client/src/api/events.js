import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:8080/api';

export function listEvents(searchText) {
  let url = `${postBaseUrl}/posts`;
  if (searchText)
      url += `?searchText=${searchText}`;

  // console.log(`Making GET request to: ${url}`);
  console.log('GET DATA FROM 肥宅');
  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript) {
    let url = `${postBaseUrl}/posts`;

    // console.log(`Making POST request to: ${url}`);
    console.log('GET DATA FROM 肥宅');
    return axios.post(url, {
        eventTitle,
        eventStartDate,
        eventEndDate,
        eventDescript
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
