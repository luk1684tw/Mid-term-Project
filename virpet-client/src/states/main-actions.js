export function toggleNavbar() {
    return {
        type: '@MAIN/TOGGLE_NAVBAR'
    };
}
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
