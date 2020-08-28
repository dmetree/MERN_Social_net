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
        case a.UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case a.GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case a.PROFILE_ERROR:
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
        case a.GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        default:
            return state;
    }
}