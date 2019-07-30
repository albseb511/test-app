import { combineReducers } from 'redux'
//const {combineReducers} =require('redux') //node

import {UPDATE_CONTACT,UPDATE_USER,REFRESH_PAGE} from './action'

//reducers
const merge = (prev,next)    => Object.assign({},prev,next)

const contactReducer = (state=[], action) => {
    if(action.type===UPDATE_CONTACT) return [...state,action.payload]
    
    return state
}
const userReducer = (state ={}, action) => {
    switch(action.type){
        case UPDATE_USER:
            return merge(state,action.payload)
        case UPDATE_CONTACT:
            return merge(state,{recentlyAdded:action.payload})
        default: 
            return state
    }
}

const reducer = combineReducers({
  user:userReducer,
  contact:contactReducer
})

export default reducer