

UPDATE_USER = 'UPDATE_USER'
UPDATE_CONTACT = 'UPDATE_CONTACT'

//reducers
const merge = (prev,next)    => Object.assign({},prev,next)

const contactReducer = (state, action) => {
    if(action.type===UPDATE_CONTACT) return [...state,action.payload]
    
    return state
}
const userReducer = (state, action) => {
    if(action.type===UPDATE_USER) return merge(state,action.payload)
    if(action.type===UPDATE_CONTACT) return merge(state,{recentlyAdded:action.payload})

    return state
}

const DEFAULT_STATE ={user:{},contact:[]}

const reducer = (state, action) => ({
    user:userReducer(state.user,action),
    contact:contactReducer(state.contact,action)

})

//Store
class Store{
    constructor(reducer, initialState)
    {
        this.reducer= reducer
        this.state = initialState
    }

    getState(){
        return this.state
    }
    
    dispatch(update){
        this.state = this.reducer(this.state,update)
    }
}

const store = new Store(reducer, DEFAULT_STATE)

//action creators
const updateUser = update => ({
    type:UPDATE_USER,
    payload: update
})

const addContact = newContact => ({
    type:UPDATE_CONTACT,
    payload: newContact
})

//dispatcher?
store.dispatch(updateUser({foo: 'foo' }))
store.dispatch(updateUser({bar: 'bar' }))
store.dispatch(updateUser({boo: 'boo' }))

store.dispatch(addContact({name:'Albert',number:'11023'}))
store.dispatch(addContact({name:'Anoop',number:'12345'}))


console.log(store.getState())