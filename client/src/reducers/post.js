import * as a from './../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case a.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case a.POSTS_ERROR:
            return {
                ...state,
                error : action.payload,
                loading: false
            }
        default:
            return state;
    }
}