//export const UPDATE_USER = 'UPDATE_USER'
//export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const REFRESH_PAGE_START = 'REFRESH_PAGE_START'
export const REFRESH_PAGE_END = 'REFRESH_PAGE_END'


//action creators
/*
export const updateUser = update => ({
    type:UPDATE_USER,
    payload: update
})

export const addContact = newContact => ({
    type:UPDATE_CONTACT,
    payload: newContact
})
*/
export const refreshPageStart = state =>({
    type:REFRESH_PAGE_START,
    payload: state
})

export const refreshPageEnd = state =>({
    type:REFRESH_PAGE_END,
    payload: state
})