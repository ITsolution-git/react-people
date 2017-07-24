import { UNAUTHED_REDIRECT, AUTHED_REDIRECT } from '../constants'
// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export function locationReducer (state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}

export function datalayerReducer(state = initialState, action) {
 //  console.log("type ================ ", action.type)
	// switch(action.type) { 
 //     case AUTHED_REDIRECT: { 
 //        console.log("Excellent"); 
 //        return state;
 //        break; 
 //     } 
 //     case UNAUTHED_REDIRECT: { 
 //        console.log("Good"); 
 //        return state;
 //        break; 
 //     }
 //     default: { 
 //        console.log("Invalid choice"); 
 //        return state;
 //        break;              
 //     } 
 //  } 
}