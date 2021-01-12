import React from 'react';
import './Image.css';

const classnames = require('classnames');

const Image = ({ src, className, ...props }) => (
    <img src={src} className={classnames('img', className)} {...props} />
);

export default Image;
