import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './SingleInfo.scss';

const SingleInfo = ({ totalSingleStake, totalPotentialWin, count }) => {
  return (
    <div className={style.container}>
      <div className={style.side}>
        <div className={style.value}>
          <T
            {...dm('{0} bets, Total {1} ¥')}
            values={{ 0: count, 1: totalSingleStake }}
          />
        </div>
      </div>
      <div className={style.side}>
        <div className={style.label}>
          <T {...dm('Potential win')} />
        </div>
        <div className={style.value}>{` : ${totalPotentialWin} ¥`}</div>
      </div>
    </div>
  );
};

SingleInfo.propTypes = {
  totalSingleStake: PropTypes.number.isRequired,
  totalPotentialWin: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default SingleInfo;
