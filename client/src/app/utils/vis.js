import React, {Component} from 'react';

/// This is a helper class to bridge the gap between react and d3
export default class Vis extends Component{
    componentDidMount(){
        this.props.draw(this.props.props);
        window.addEventListener('resize', this.componentResize.bind(this));
    }

    componentDidUpdate(){
        this.props.draw(this.props.props);
    }

    shouldComponentUpdate(nextProps){
        return false;
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.componentResize);
    }
    
    componentResize(){
        console.log('in resize');
        this.props.draw(this.props.props);
    }

    render(){
        return <div id={this.props.props.element} className="vis"></div>
    }
}
