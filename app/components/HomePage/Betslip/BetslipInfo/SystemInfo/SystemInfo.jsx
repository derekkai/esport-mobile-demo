import React from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import style from './SystemInfo.scss';

const SystemInfo = ({
  stake,
  count,
  price,
  updateStake,
  setKeyBoardHandleFunc,
  openKeyBoard,
}) => {
  const potentialWin = (price * stake).toFixed(
    settings.balanceDecimalPlaceDisplay,
  );

  const handleStakeInputClick = () => {
    openKeyBoard({ open: true, decimal: false });
    setKeyBoardHandleFunc(param => {
      updateStake(param);
    });
  };

  const totalCost = count * stake;

  return (
    <div className={style.container}>
      <div className={style.section}>
        <StakeInput
          readOnly
          className={style.stakeInput}
          stake={stake}
          onClick={handleStakeInputClick}
        />
        <StakeInput readOnly stake={totalCost} placeholder="Total Stake" />
      </div>
      <div className={style.section}>
        <div className={style.side}>
          <div className={style.label}>
            <T {...dm('Odds')} />
          </div>
          <div className={style.value}>{` : ${price.toFixed(
            settings.priceDecimalPlaceDisplay,
          )}`}</div>
        </div>
        <div className={style.side}>
          <div className={style.label}>
            <T {...dm('Potential win')} />
          </div>
          <div className={style.value}>{` : ${potentialWin} ¥`}</div>
        </div>
      </div>
    </div>
  );
};

SystemInfo.propTypes = {
  stake: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  updateStake: PropTypes.func.isRequired,
  setKeyBoardHandleFunc: PropTypes.func.isRequired,
  openKeyBoard: PropTypes.func.isRequired,
};

export default SystemInfo;
