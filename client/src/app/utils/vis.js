import React, {Component} from 'react';

/// This is a helper class to bridge the gap between react and d3
export default class Vis extends Component{
    constructor(){
        super()

        this.componentResize = this.componentResize.bind(this);
    }

    componentDidMount(){
        this.props.draw(this.props.props);
        window.addEventListener('resize', this.componentResize);
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
        this.props.draw(this.props.props);
    }

    render(){
        return <div id={this.props.props.element} className="h-100"></div>
    }
}
