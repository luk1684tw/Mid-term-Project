import {
    createEvent as createEventFromApi,
    listEvents as listEventsFromApi
} from 'api/events.js';

export function eventTitle(eventTitleValue) {
    return {
        type: '@EVENTS/EVENT_TITLE',
        eventTitleValue
    };
};
export function eventDescript(eventDescriptValue) {
    return {
        type: '@EVENTS/EVENT_DESCRIPT',
        eventDescriptValue
    };
};
export function eventGetStartDate(eventStartDate){
    return {
        type: '@EVENTS/EVENT_GET_START_DATE',
        eventStartDate
    };
}
export function eventGetEndDate(eventEndDate){
    return {
        type: '@EVENTS/EVENT_GET_END_DATE',
        eventEndDate
    };
}

export function eventDanger(eventDanger) {
    return {
        type: '@EVENTS/EVENT_DANGER',
        eventDanger
    };
};
export function changeModal(){
    return {
         type: '@EVENTS/CHANGE_MODAL'
    };
}
// -----------------------------------
//------------------------------------
function startEventLoading(){
    return {
         type: '@EVENTS/START_EVENT_LOADING'
    };
};
function endEventLoading(){
    return{
        type: '@EVENTS/END_EVENT_LOADING'
    };
}
function endlistEvents(events){
    return{
        type: '@EVENTS/END_LIST_EVENTS',
        events
    }
}
export function listEvents(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startEventLoading());

        return listEventsFromApi(searchText).then(events => {
            dispatch(endlistEvents(events));
            dispatch(endEventLoading());
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(endEventLoading());
        });
    };
};
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript) {
    return (dispatch, getState) => {
        dispatch(startEventLoading());

        return createEventFromApi(eventTitle, eventStartDate, eventEndDate, eventDescript).then(events => {
            dispatch(listEvents(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating post', err);
            dispatch(endEventLoading());
        });
    };
};
