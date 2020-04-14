import React, { Component } from 'react';
import dateformat from 'dateformat';
import dataUtils from '../utils/dataUtils';
import moment from 'moment';
// components
import MapVisual from '../components/MapVisual';

// Dependancy injection
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateState } from '../utils/stateUtils';
import { getMapGeoJson } from '../../actions/forecastActions';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            ...this.defaultSelectedState,
            forecast: {
                map: {},
                forecast: [],
                lastUpdated: ''
            },
            time_listeners: [],
            clickCounter: 1,
            selectedTime: null,
            isAutoplay: true
        };
    }

    componentDidMount() {
        if (!this.props.forecast.map) {
            this.props.getMapGeoJson();
        }


    }
    dateformat = 'DD-MM-YYYY hh:mm a'

    componentDidUpdate(prevProps, prevState) {
        updateState(this);
        
        if (this.state.selectedTime === null && this.state.forecast?.forecast?.length > 0) {
            let startTime = dataUtils.getStart(this.state.forecast.forecast).subtract(1, 'hour');
            let endTime = dataUtils.getEnd(this.state.forecast.forecast);
            console.log(startTime.format(this.dateformat));
            console.log(endTime.format(this.dateformat));
            this.setState({
                selectedTime: startTime.clone(),
                endTime: endTime,
                startTime:startTime
            });
            this.startAnimation(true);
        }

    }

    resetAnimation() {
        let startTime = dataUtils.getStart(this.state.forecast?.forecast).subtract(1, 'hour');;
    
        let prevStateAutoplay = this.state.isAutoplay;
        
        this.setState({
            isAutoplay: true,
            selectedTime: startTime
        }, () => {
            
            if (!prevStateAutoplay)
                this.startAnimation(true);
        });

    }

    startAnimation(forceRestart = false) {

        const timeout = 750;
        if ((this.state.isAutoplay || forceRestart) && this.state.selectedTime) {
            
            var nextTime = this.state.selectedTime.add(1, 'hour');
            
            if(nextTime.isAfter(this.state.endTime)){
                nextTime = this.state.startTime.clone();
            }
               
            this.publish({
                type: 'SET_TIME',
                payload: { time: nextTime, duration: timeout }
            });
            
            this.setState({
                selectedTime: nextTime,
            });
        }

        if ((this.state.isAutoplay || forceRestart)) {

            setTimeout(() => {
                this.startAnimation();
            }, timeout);
        }
    }

    defaultSelectedState = {
        selectedName: 'National',
        selectedId: 0
    }

    publish = (message) => {
        let { type, payload } = message;

        switch (type) {
            case 'SELECTED_COUNTY':
                this.countyCallback(payload);
                break;
            case 'SET_TIME':
                this.setTime(payload);
                break;
            case 'REGISTER_TIME_LISTENER':
                this.setState(prevState => ({
                    time_listeners: [...prevState.time_listeners, payload]
                }));
                break;
            default:
                break;
        }
    };

    setTime = (payload) => {
        let { time, duration } = payload;

        let toExecute = [];

        for (let c of this.state.time_listeners) {

            toExecute.push(new Promise((resolve) => resolve(c(time, duration))));
        }
        Promise.all(toExecute).then();
    };

    countyCallback = (selectedCounty) => {

        if (selectedCounty) {
            this.setState({
                selectedName: selectedCounty.properties.ShortName,
                selectedId: selectedCounty.properties.GSPGroupID
            });
        } else {
            this.setState({
                ...this.defaultSelectedState
            });
        }
    };

    // we should load in the forecast data here as it can be used by multiple resources.
    render() {
        let { forecast, selectedId, selectedTime } = this.state;
        const output = dataUtils.getOutput(forecast.forecast, selectedId, selectedTime) ?? 0;
        const lastUpdated = this.state.forecast.lastUpdated !== '' ? dateformat(this.state.forecast.lastUpdated, 'dd-mm-yy hh:MM TT') : 'unknown';

        return (
            <div className='container-fluid'>
                <div className='row text-break'>
                    <div className='col-md-5'>
                        <div className='display-2'>
                            Future Energy
                        </div>
                        <div className='display-4 text-muted'>
                            Forecasting renewable energy.
                        </div>
                        <div className='h3 my-3'>
                            Supplier region: {this.state.selectedName}
                        </div>
                        <div className='h3 my-3'>
                            Next Hour: {output.toPrecision(6)} MW
                        </div>
                        <div className='my-3'>
                            <p>Today is green</p>
                        </div>
                        <div className='my-3'>
                            <p> last updated: {lastUpdated}</p>
                        </div>
                        <div className='my-3'>
                            <p> time: {moment(selectedTime).format(this.dateformat) ?? 'loading'}</p>
                        </div>
                        <div  className='my-3'>
                            <button className='btn btn-outline-primary' onClick={e => {
                                this.setState({ isAutoplay: false });
                            }}>Stop</button>
                        </div>
                        <div  className='my-3'>
                            <button type="button" className="btn btn-outline-primary" onClick={(e) => {

                                this.resetAnimation();

                            }}>Reset</button>
                        </div>

                        <div className='my-4'>

                            <a className='btn btn-outline-light' href='https://github.com/gwdowner/PRCO304'><strong>Github: </strong>Gwdowner/PRCO304</a>
                        </div>
                    </div>
                    <div className='col-md-4 py-3 mapContainer'>
                        <MapVisual callback={this.publish}></MapVisual>
                    </div>
                    <div className='col-md-1 my-3'>
                        <div>More visuals coming soon</div>
                    </div>
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    getMapGeoJson: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    forecast: state.forecast
});
export default connect(
    mapStateToProps, { getMapGeoJson }
)(Home);