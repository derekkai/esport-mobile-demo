import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './GameStatusDisplay.scss';

const GameStatusDisplay = ({ type, haveVideo, isDark = false, timestamp }) => {
  const { hours, day, minute, month } = timeConvert(timestamp);
  const time = `${month}/${day} ${hours}:${minute}`;

  const renderGameStatus = () => {
    if (haveVideo) return <div className={style.videoTag}>LIVE</div>;
    return type === 1 ? <T {...dm('Live')} /> : time;
  };

  return (
    <div className={classNames(style.container, isDark && style.dark)}>
      {renderGameStatus()}
    </div>
  );
};

GameStatusDisplay.propTypes = {
  type: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  isDark: PropTypes.bool,
  timestamp: PropTypes.number.isRequired,
};

export default GameStatusDisplay;
