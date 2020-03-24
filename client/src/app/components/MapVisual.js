import React, { Component } from 'react';
import Vis from '../utils/vis';
import draw from '../d3/choroplethVis';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMapGeoJson, getForecast } from '../../actions/forecastActions';
import { updateState } from '../utils/stateUtils';

class MapVisual extends Component {

    constructor() {
        super();
        this.state = {
            forecast: {
                map: {},
                forecast: []
            },
            localState: {}
        };
    }

    componentDidMount() {
        if (!this.props.forecast.map) {
            this.props.getMapGeoJson();
        }

        if (!this.props.forecast.forecast) {
            this.props.getForecast();
        }

        updateState(this);
    }

    componentDidUpdate() {
        updateState(this);
    }

    render() {
        var uk = this.state.forecast.map;

        if (!uk?.features)
            return (
                <div>
                    No Map found!
                </div>
            );
        let props = {
            mapJson: uk,
            element: 'mapVis',
            callback: this.props.callback
        };

        return (<Vis draw={draw} props={props} />);
    }
}

MapVisual.propTypes = {
    getMapGeoJson: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    forecast: state.forecast
});

export default connect(
    mapStateToProps, { getMapGeoJson, getForecast }
)(MapVisual);

