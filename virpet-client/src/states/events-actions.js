import {
    createEvent as createEventFromApi,
    listEvents as listEventsFromApi,
    accomplishEvent as accomplishEventFromApi
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
function endListEvents(events){
    return{
        type: '@EVENTS/END_LIST_EVENTS',
        events
    }
}
export function listEvents(searchText, loading = false, showDays) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startEventLoading());

        return listEventsFromApi(getState().events.unaccomplishedOnly, searchText, showDays).then(events => {
            dispatch(endListEvents(events));
            dispatch(endEventLoading());
            console.log('Events in actions.listEvents', events);
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(endEventLoading());
        });
    };
};
export function createEvent(eventTitle, eventStartDate, eventEndDate, eventDescript) {
    console.log('Action.eventTitle' + eventTitle);
    console.log('Action.eventDescript' + eventDescript);
    return (dispatch, getState) => {
        dispatch(startEventLoading());

        return createEventFromApi(eventTitle, eventStartDate, eventEndDate, eventDescript).then(events => {
            dispatch(listEvents(getState().searchText, true, 7));
        }).catch(err => {
            console.error('Error creating post', err);
            dispatch(endEventLoading());
        });
    };
};
export function accomplishEvent(id) {
    return (dispatch, getState) => {
        dispatch(startEventLoading());
        console.log('In events-action.accomplishEvent and call accomplishEventFromApiapi');
        return accomplishEventFromApi(id).then(() => {
            dispatch(listEvents(getState().searchText, true, 7));
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            dispatch(endEventLoading());
        });
    }
}
function toggleUnaccomplishedOnly() {
    return {
        type: '@EVENTS/TOGGLE_UNACCOMPLISHED_ONLY'
    };
}

export function toggleAndList() {
    return (dispatch, getState) => {
        dispatch(toggleUnaccomplishedOnly());
        return dispatch(listEvents(getState().searchText, true, 7));
    }
}
//------------------------
//------------------------
export function toggleForm() {
    return {
        type: '@EVENTSFORM/TOGGLE_FORM'
    };
}
export function toggleTemp() {
    return {
        type: '@EVENTSFORM/TOGGLE_TEMP'
    };
}
export function selectShowDays(showDays) {
    return {
        type: '@EVENTSFORM/SELECT_SHOW_DAYS',
        showDays
    };
};
