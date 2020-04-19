import React, { Component } from 'react';
import Background from '../assets/darkTurbines.jpg';

class Header extends Component {
    render() {
        return (
            <div style={{ backgroundImage: "url(" + Background + ")" }}
                className='row align-items-center border-bottom border-white py-2 header vh-100'>
                <div className='offset-sm-3 col-sm-6'>
                    <div className='container'>
                        <h1 className='display-2 text-center'>
                            Future Energy
                        </h1>
                    </div>
                </div>
                <div className='col-sm-3 my-sm-1 my-3'>
                    <div className='d-flex'>
                        <a className='btn btn-outline-light mx-auto' href='https://github.com/gwdowner/PRCO304'>
                            <strong>Github: </strong>Gwdowner/PRCO304
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;