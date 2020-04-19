import React, { Component } from 'react';
import SocialButton from './socialButton';
import { ReactComponent as LinkedInLogo } from '../assets/linkedin.svg';
import { ReactComponent as EmailLogo } from '../assets/envelope.svg';
import Strings from '../../strings/index.json';

class Footer extends Component {
    render() {
        return (
            <div className='footer py-3'>
                <div className='container'>
                    <div className='row text-center pt-3'>
                        <div className='col-sm-4'>
                            <div className='h5 '>
                                About
                            </div>
                            <hr className='edging'></hr>
                            <p>
                                {Strings.footer_about}
                            </p>
                        </div>
                        <div className='col-sm-3'>
                            <div className='h5'>
                                API Endpoints
                            </div>
                            <hr className='edging'></hr>
                            <ul className='list-unstyled'>
                                <li>
                                    forecast.api.future-energy.live/
                                </li>
                                <li>
                                    data.api.future-energy.live/
                                </li>
                            </ul>
                        </div>
                        <div className='col-sm-3'>
                            <div className='h5'>
                                Data Sources
                            </div>
                            <hr className='edging'></hr>
                            <ul className='list-unstyled'>
                                <li>
                                    Sheffield solar live
                                </li>
                                <li>
                                    Met Office
                                </li>
                                <li>
                                    Meteostat
                                </li>
                            </ul>
                        </div>
                        <div className='col-sm-2'>
                            <div className='h5'>Contact</div>
                            <hr className='edging'></hr>
                            <div className='d-flex'>
                                <SocialButton className='linkedin' link='https://www.linkedin.com/in/george-downer'>
                                    <LinkedInLogo className='logoWhite' />
                                </SocialButton>
                                <SocialButton className='logoDefualt' link='mailto:George.Downer@students.plymouth.ac.uk'>
                                    <EmailLogo className='logoWhite' />
                                </SocialButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;