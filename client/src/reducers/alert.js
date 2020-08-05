import * as a from './../actions/types';

const initialState = [
    // {
    //     id: 1,
    //     msg: 'Please log in',
    //     alertType: 'Success'
    // }
]
// action has type & payload
// action has a type by default
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case a.SET_ALERT:
            return [
                ...state,
                payload
            ];
        case a.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;

    }
}