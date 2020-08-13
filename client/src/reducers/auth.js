import * as a from './../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action ){
    // const {type, payload} = action;
    
    switch(action.type) {
        case a.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case a.REGISTER_FAIL: 
        case a.AUTH_ERROR:
        localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case a.USER_LOADED: 
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        default:
            return state;

    }
     
}