import axios from 'axios';
import * as a from './types';
import {setAlert} from './alert';
import setAuthToken from './../utils/setAuthToken'


// Load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: a.USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: a.AUTH_ERROR
        });
    }
} 



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
        dispatch(loadUser());
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



// Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type: a.LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: a.LOGIN_FAIL
        })
    }
}


// Logout / Clear profile
export const logout = () => dispatch => {
    dispatch({type: a.CLEAR_PROFILE})
    dispatch({type: a.LOGOUT})
}




