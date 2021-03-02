import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './SmartButton.scss';

const SmartButton = React.memo(
  ({
    position,
    isArrowUp,
    className,
    onClick = () => {},
    skinId,
    status = 'normal',
    text,
  }) => {
    const handleClick = e => {
      if (status !== 'lock') {
        onClick(e);
        e.stopPropagation();
      }
    };

    const createText = () => {
      if (!text && text !== 0) {
        return '';
      }
      return <T {...dm(text)} />;
    };

    let direction = '';
    if (isArrowUp !== '') {
      direction = isArrowUp ? 'up' : 'down';
    }

    return (
      <div
        aria-hidden
        className={classNames(
          className,
          style[`skin${skinId}`],
          style[`skin${skinId}-${status}`],
          direction === '' || style[direction],
          position ? style[position] : style.noArrow,
          style.container,
        )}
        onClick={handleClick}
      >
        {status !== 'lock' && createText()}
      </div>
    );
  },
);

SmartButton.propTypes = {
  isArrowUp: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  position: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  skinId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SmartButton;
