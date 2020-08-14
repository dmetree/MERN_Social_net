import axios from 'axios';
import * as a from './types';
import { setAlert } from './alert';

// get current user's profile

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('api/profile/me')

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
