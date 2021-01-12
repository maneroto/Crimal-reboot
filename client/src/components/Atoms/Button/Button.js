import React from 'react';
import './Button.css';

const classnames = require('classnames');

const Button = ({ children, className, ...props }) => (
    <button className={classnames('btn', className)} {...props}>
        {children}
    </button>
);

export default Button;
