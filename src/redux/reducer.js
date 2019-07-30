//import { combineReducers } from 'redux'
//const {combineReducers} =require('redux') //node

import {REFRESH_PAGE_START,REFRESH_PAGE_END} from './action'

//reducers
//const merge = (prev,next)    => Object.assign({},prev,next)

const initialState={
    rCheck:true,
    test:0
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
            console.log('refesh page start')
            state.rCheck=true
            break
        case REFRESH_PAGE_END:
                console.log('refesh page end')
                state.rCheck=false
            break
        default: return state
    }
}

export default reducer