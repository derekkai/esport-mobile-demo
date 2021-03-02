import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './HeaderFlag.scss';

const HeaderFlag = ({
  className,
  text,
  active,
  isTag = false,
  onClick = () => {},
  value,
}) => {
  const handleClick = () => {
    if (!isTag) {
      onClick(value);
    }
  };

  return (
    <div
      aria-hidden
      className={classNames(
        className,
        isTag && style.tag,
        style.container,
        active && style.active,
      )}
      onClick={handleClick}
    >
      <div className={style.content}>
        <T {...dm(text)} />
      </div>
      <div className={style.background} />
    </div>
  );
};

HeaderFlag.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  isTag: PropTypes.bool,
  onClick: PropTypes.func,
  isButton: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderFlag;
