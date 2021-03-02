import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './MarketLock.scss';

const MarketLock = ({ isVertical = false }) => {
  return (
    <div className={classNames(style.container, isVertical && style.vertical)}>
      <div className={style.icon} />
      <div className={style.text}>
        <T {...dm('Currently closed')} />
      </div>
    </div>
  );
};

MarketLock.propTypes = {
  isVertical: PropTypes.bool,
};

export default MarketLock;
