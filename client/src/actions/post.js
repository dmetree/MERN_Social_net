import axios from 'axios';
import * as a from './types';
import { setAlert } from './alert';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: a.GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}