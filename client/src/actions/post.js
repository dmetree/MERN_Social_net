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

// add like 
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: a.UPDATE_LIKES,
            payload: {id, likes: res.data} 
        })
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



// remove like 
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: a.UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



// Add post
export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: a.ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: a.DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Get post 
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: a.GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}




// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: a.ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: a.REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed ', 'success'));
    } catch (err) {
        dispatch({
            type: a.POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

