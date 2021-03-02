import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Arrow.scss';

const Arrow = ({ className, active, onClick, direction }) => {
  return (
    <div
      aria-hidden
      className={classNames(
        className,
        style.arrow,
        active && style.active,
        direction && style[direction],
      )}
      onClick={onClick}
    />
  );
};

Arrow.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  direction: PropTypes.string,
};

export default Arrow;
