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
                error: action.payload,
                loading: false
            }
        case a.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            }
        case a.DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => 
                    post._id !== action.payload     
                ),
                loading: false
            }
        case a.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === action.payload.id ? { ...post, likes: action.payload.likes} : post
                ),
                loading: false
            }
        default:
            return state;
    }
}