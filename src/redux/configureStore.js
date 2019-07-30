import { createStore } from 'redux'
//const {combineReducers, createStore} =require('redux') //node
import {addContact, updateUser, refreshPage} from './action'
import reducer from './reducer'

const store = createStore(reducer ,['STORE'])
/*
store.dispatch(updateUser({foo: 'foo' }))
store.dispatch(updateUser({bar: 'bar' }))
store.dispatch(updateUser({boo: 'boo' }))

store.dispatch(addContact({name:'Albert',number:'11023'}))
store.dispatch(addContact({name:'Anoop',number:'12345'}))
*/

export default store