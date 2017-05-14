const initEventState = {
  startEventLoading: false,
  events: [],
  unaccomplishedOnly: false
}
export function events(state = initEventState, action) {
    switch(action.type) {
        case '@EVENTS/START_EVENT_LOADING':
            return{
                ...state,
                startEventLoading: true
            };
        case '@EVENTS/END_EVENT_LOADING':
            return{
                ...state,
                startEventLoading: false
            };
        case '@EVENTS/END_LIST_EVENTS':
            return{
                ...state,
                events: action.events
            };
        case '@EVENTS/TOGGLE_UNACCOMPLISHED_ONLY':
            return {
                ...state,
                unaccomplishedOnly: !state.unaccomplishedOnly
            };
        default:
            return state;
    }
}
const initEventFormState = {
    modal: false,
    eventTitleValue: '',
    eventDescriptValue: '',
    eventStartDate: '',
    eventEndDate: '',
    eventDanger: false,
};
export function eventForm(state = initEventFormState, action) {
    switch (action.type) {
        case '@EVENTS/EVENT_TITLE':
            return {
                ...state,
                eventTitleValue: action.eventTitleValue
            };
        case '@EVENTS/EVENT_DANGER':
            return {
                ...state,
                eventDanger: action.eventDanger
            };
        case '@EVENTS/EVENT_DESCRIPT':
            return {
                ...state,
                eventDescriptValue: action.eventDescriptValue
            };
        case '@EVENTS/EVENT_GET_START_DATE':
            return {
                ...state,
                eventStartDate: action.eventStartDate
            };
        case '@EVENTS/EVENT_GET_END_DATE':
            return {
                ...state,
                eventEndDate: action.eventEndDate
            };
        case '@EVENTS/CHANGE_MODAL':
            return{
                 ...state,
                 modal: !state.modal
            };
        default:
            return state;
    }
}
const initEventsFormState = {
    formToggle: false,
    tempToggle: false,
    showDays: 7
};

export function eventsForm(state = initEventsFormState, action) {
    switch (action.type) {
        case '@EVENTSFORM/TOGGLE_FORM':
            return {
                ...state,
                formToggle: !state.formToggle
            };
        case '@EVENTSFORM/TOGGLE_TEMP':
            return {
                ...state,
                tempToggle: !state.tempToggle
            };
        case '@EVENTSFORM/SELECT_SHOW_DAYS':
            return {
                ...state,
                showDays: action.showDays
            };
        default:
            return state;
    }
}
