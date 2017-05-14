import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:8080/api';


export function listEvents(unaccomplishedOnly, searchText, showDays) {
  let url = `${postBaseUrl}/posts`;
  if (searchText)
      url += `?searchText=${searchText}`;

  console.log('API.listEvents.unaccomplishedOnly = ' + unaccomplishedOnly);
  console.log('API.listEvents.searchText = ' + searchText);
  console.log('API.listEvents.showDays = ' + showDays);
  return axios.get(url).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);

      return res.data;
  });
}
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript) {
    let url = `${postBaseUrl}/posts`;

    // console.log(`Making POST request to: ${url}`);
    console.log('API.eventTitle = ' + eventTitle);
    console.log('API.eventStartDate = ' + eventStartDate);
    console.log('API.eventEndDate = '+ eventEndDate);
    console.log('API.eventDescript = '+eventDescript);
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
