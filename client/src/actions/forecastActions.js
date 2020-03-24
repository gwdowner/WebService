import axios from 'axios';
import {
    SET_UK_MAP,
    SET_UK_FORECAST
} from './types';

let gettingForecast = false;
export const getForecast = () => dispatch => {

    if (!gettingForecast) {
        gettingForecast = true;
        axios
            //.get('/api/latestforecast')
            .get('/data.json')
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: SET_UK_FORECAST,
                        payload: res.data,
                    });
                }

                gettingForecast = false;
            });
    }
};

let gettingMap = false;
export const getMapGeoJson = () => dispatch => {
    if (!gettingMap) {
        gettingMap = true;
        axios
            .get('/GSP_Group_Regions.json')
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: SET_UK_MAP,
                        payload: res.data,
                    });
                }
                gettingMap = false;
            });
    }
}