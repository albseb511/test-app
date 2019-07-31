//import { combineReducers } from 'redux'
//const {combineReducers} =require('redux') //node

import {REFRESH_PAGE_START,REFRESH_PAGE_END} from './action'

//reducers
const merge = (prev,next)    => Object.assign({},prev,next)

const initialState={
    rCheck:true,
    test:'i'
  }
  /*
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
*/
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case REFRESH_PAGE_START:
            return {test:'start'}
        case REFRESH_PAGE_END:
            return {test:'end'}

    }
    return state
}

export default reducer