import React, { Component } from 'react';
import Vis from '../utils/vis';
import axios from 'axios';
import draw from '../d3/choroplethVis';

class MapVisual extends Component {

    constructor() {
        super();
        this.state = {
            map: {}
        }
        axios.get('/GSP_Group_Regions.json').then(res => {

            this.setState({
                map: res.data
            });
        });
    }

    render() {
        var uk = this.state.map;
        
        if (!uk.features)
            return (
                <div>
                    No Map found!
                </div>
            );
        let props = {
            mapJson: uk,
            element: 'mapVis',
            callback:this.props.callback
        };

        return (<Vis draw={draw} props={props} />);
    }
}

export default MapVisual;
