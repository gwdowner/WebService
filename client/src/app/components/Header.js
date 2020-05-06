import React, { Component } from 'react';
import { ReactComponent as DownIcon } from '../assets/arrow-circle-down.svg';

class Header extends Component {
    render() {
        return (

            <div className='vh-100'>
                <div className='row align-items-center py-2 h-100'>
                    <div className='offset-sm-3 col-sm-6'>
                        <div className='container'>
                            <h1 className='display-2 text-center'>
                                Future Energy
                                </h1>

                        </div>
                        <div className='d-flex w-100'>
                            <div className='icon mx-auto' onClick={() => { document.getElementById('main').scrollIntoView({ behavior: "smooth" }) }}>
                                <DownIcon className='h-100 w-100' />
                            </div>
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
            </div>
        );
    }
}

export default Header;