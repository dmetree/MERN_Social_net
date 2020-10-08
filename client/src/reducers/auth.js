import * as a from './../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action ){
    // const {type, payload} = action; // in action \ there's 2 properties.
    
    switch(action.type) {
        case a.REGISTER_SUCCESS:
        case a.LOGIN_SUCCESS: 
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
          
        case a.REGISTER_FAIL: 
        case a.AUTH_ERROR:
        case a.LOGIN_FAIL: 
        case a.LOGOUT: 
        case a.ACCOUNT_DELETED:
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