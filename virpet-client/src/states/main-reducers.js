import moment from 'moment';
const initMainState = {
    navbarToggle: false,
    pictureNum: 0
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                navbarToggle: !state.navbarToggle
            };
       case '@MAIN/Animated':
            return {
                pictureNum: (state.pictureNum<75) ?　state.pictureNum+1 : 0
            };
        default:
            return state;
    }
}
const initEventState = {
    eventTitleValue: '',
    eventDescriptValue: '',
    eventStartDate: '',
    eventEndDate: '',
    eventDanger: false,

};
export function events(state = initEventState, action) {
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
        default:
            return state;
    }
}
