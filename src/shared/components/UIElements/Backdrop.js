import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Backdrop.css';

const Backdrop = ({ onClick }) => {
  const content = <div className='backdrop' onClick={onClick}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook')
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
