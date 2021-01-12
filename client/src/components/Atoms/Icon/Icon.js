import React from 'react';
import './Icon.css';

const classnames = require('classnames');

const Icon = ({ icon, className, ...props }) => (
    <i
        className={classnames('icon', className, { [`icon-${icon}`]: icon })}
        {...props}
    />
);

export default Icon;
