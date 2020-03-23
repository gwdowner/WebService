import {
    SET_UK_FORECAST,
    SET_UK_MAP
} from '../actions/types';

const initialState = {
    

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_UK_FORECAST:
            return {
                ...state,
                forecast:action.payload
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
