import axios from 'axios';
import * as a from './types';
import { setAlert } from './alert';

// get current user's profile

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: a.GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: a.GET_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// create / update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: a.GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));

        if(!edit){
            history.push('/dashboard');
        }
    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(err.msg, 'danger')));
        } 
        
        dispatch({
            type: a.GET_PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
