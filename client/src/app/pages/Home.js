import React, { Component } from 'react';
import dateformat from 'dateformat';

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

        };

    }

    componentDidMount() {
        if (!this.props.forecast.map) {
            this.props.getMapGeoJson();
        }
    }

    componentDidUpdate() {
        updateState(this);
    }

    defaultSelectedState = {
        selectedName: 'National',
        selectedId: 0
    }

    countyCallback = (selectedCounty) => {

        if (selectedCounty) {
            this.setState({
                selectedName: selectedCounty.properties.ShortName,
                selectedId: selectedCounty.properties.GSPGroupID
            })
        } else {
            this.setState({
                ...this.defaultSelectedState
            })
        }
    };


    // we should load in the forecast data here as it can be used by multiple resources.
    render() {
        const output = this.state.forecast.forecast.find(x => x.code === this.state.selectedId)?.value;
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
                            Next Hour: {output ?? 0}MW/h
                        </div>
                        <div className='my-3'>
                            <p>Today is green</p>
                        </div>
                        <div className='my-3'>
                            <p> last updated: {lastUpdated}</p>
                        </div>

                        <div className='my-4'>
                            <strong>Github: </strong>
                            <a className='text-decoration-none' href='https://github.com/gwdowner/PRCO304'>Gwdowner/PRCO304</a>
                        </div>
                    </div>
                    <div className='col-md-4 py-3 mapContainer'>
                        <MapVisual callback={this.countyCallback}></MapVisual>
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