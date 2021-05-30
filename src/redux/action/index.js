import axios from 'axios'

export const actionType ={
     LAUNCH_DATA_SUCCESS : 'LAUNCH_DATA_SUCCESS',
     ACTION_NAME : 'ACTION_IDENTIFIER',
     UPDATE_FILTER_DATES : 'UPDATE_FILTER_DATES',
     FILTER_LAUCHES_DATA : 'FILTER_LAUCHES_DATA',
}

const FETCHLAUNCHES = (payload, params) => async dispatch =>{
    await axios({
        method : "GET",
        url : 'https://api.spacexdata.com/v3/launches',
        data : {},
        headers : {'content-type' : 'application/json'}
    }).then(response =>{
        dispatch({
            type: actionType.LAUNCH_DATA_SUCCESS,
            launchData : response['data']
        })
    }).catch(error => alert(error));
}


export  default FETCHLAUNCHES