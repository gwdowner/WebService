import React, { Component } from 'react';

import MapVisual from '../components/MapVisual';
import axios from 'axios';
import dateformat from 'dateformat';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            ...this.defaultSelectedState,
            forecast: [],
            lastUpdated: new Date()
        };
        this.loadData();
    }

    loadData() {
        axios.get('/data.json').then(res => {

            this.setState({
                forecast: res.data,
                lastUpdated: new Date()
            });
        });
    }

    defaultSelectedState = {
        selectedName: 'National',
        selectedId: 0
    }

    countyCallback = (selectedCounty) => {
        console.log(selectedCounty);
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
        const output = this.state.forecast.find(x => x.code === this.state.selectedId)?.value;


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
                            <p> last updated: {dateformat(this.state.lastUpdated, 'dd-mm-yy hh:mm TT')}</p>
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

export default Home