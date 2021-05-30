

import {actionType} from '../action/index'

const initialState = {
    launchData: [],
    filterDates : null ,
    filterUpcomingPast : null,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LAUNCH_DATA_SUCCESS: {
            return {
                ...state, launchData: action.launchData
            }
        }
        case actionType.UPDATE_FILTER_DATES :{
            return{
                ...state, filterDates : action.payload
            }
        }
        case actionType.FILTER_LAUCHES_DATA :{
        return{
            ...state, filterUpcomingPast : action.payload.check
        }
        }
        
        default: return state
    }

}