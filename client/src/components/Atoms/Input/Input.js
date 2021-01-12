import React from 'react';
import './Input.css';

const classnames = require('classnames');

const Input = ({ name, type, className, ...props }) => (
    <input
        className={classnames('input', className)}
        type={type}
        name={name}
        id={name}
        {...props}
    />
);

export default Input;
