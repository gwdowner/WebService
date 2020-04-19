import React, { Component } from 'react';

class SocialButton extends Component {
    render() {
        return (
            <div className={'mx-auto social-item ' + this.props.className}>
                <a href={this.props.link}>
                    <div className='border-0 rounded-circle h-100'>
                        <div className='d-flex flex-column h-100'>
                            <div className='my-auto'>
                                {this.props.children}
                            </div>

                        </div>
                    </div>
                </a>
            </div>
        );
    }

}

export default SocialButton;