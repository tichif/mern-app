import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const Avatar = ({ className, width, style, image, alt }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
