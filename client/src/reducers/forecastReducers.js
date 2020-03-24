import {
    SET_UK_FORECAST,
    SET_UK_MAP
} from '../actions/types';

const initialState = {
    forecast:null,
    map:null,
    lastUpdated:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_UK_FORECAST:
            return {
                ...state,
                forecast:action.payload,
                lastUpdated: new Date()
            };
        case SET_UK_MAP:
            return {
                ...state,
                map:action.payload
            };
        default:
            return state;
    }
}
