import { combineReducers } from 'redux';
import forecastReducer from './forecastReducers';

export default combineReducers({
    forecast:forecastReducer
});