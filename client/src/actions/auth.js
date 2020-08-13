import axios from 'axios';
import * as a from './types';
import {setAlert} from './alert';

// Register user
export const register = ({name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('api/users', body, config)

        dispatch({
            type: a.REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: a.REGISTER_FAIL
        })
    }
}


