import React, {Component} from 'react';

/// This is a helper class to bridge the gap between react and d3
export default class Vis extends Component{
    componentDidMount(){
        this.props.draw(this.props.props);
    }

    componentDidUpdate(){
        this.props.draw(this.props.props);
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        return <div id={this.props.props.element} className="vis"></div>
    }
}
