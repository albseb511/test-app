export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const REFRESH_PAGE = 'REFRESH_PAGE'


//action creators
export const updateUser = update => ({
    type:UPDATE_USER,
    payload: update
})

export const addContact = newContact => ({
    type:UPDATE_CONTACT,
    payload: newContact
})

export const refreshPage = state =>({
    type:REFRESH_PAGE,
    payload: state
})