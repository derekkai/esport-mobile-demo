import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './Chip.scss';

const Chip = ({ className, size = 'sm', type, text }) => {
  return (
    <div
      className={classNames(
        style.container,
        style[type],
        style[size],
        className,
      )}
    >
      <div className={style.text}>
        <T {...dm(text || type)} />
      </div>
    </div>
  );
};

Chip.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default Chip;
