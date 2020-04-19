
import React, { Component } from 'react';
import Vis from '../utils/vis';
import draw from '../d3/multiLineGraphVis';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getForecast } from '../../actions/forecastActions';
import { updateState } from '../utils/stateUtils';
import Loading from './loading';

class MultiLineVisual extends Component {

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
        if (!this.props.forecast.forecast) {
            this.props.getForecast();
        }

        updateState(this);
    }

    componentDidUpdate() {
        updateState(this);
    }

    render() {
        let forecast = this.state.forecast;
        let data = forecast.forecast;

        if (!data)
            return (
                <Loading />
            );
        let props = {
            element: 'lineGraphVis',
            callback: this.props.callback,
            data : data
        };

        return (<Vis draw={draw} props={props} />);
    }
}

MultiLineVisual.propTypes = {
    getForecast: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    forecast: state.forecast
});

export default connect(
    mapStateToProps, { getForecast }
)(MultiLineVisual);

