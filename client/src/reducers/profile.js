import * as a from './../actions/types';



const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case a.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case a.GET_PROFILE_ERROR: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case a.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}