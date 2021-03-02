import React from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import style from './MultipleInfo.scss';

const MultipleInfo = ({
  setKeyBoardHandleFunc,
  openKeyBoard,
  price,
  stake,
  updateStake,
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

  return (
    <div className={style.container}>
      <div className={style.section}>
        <StakeInput stake={stake} onClick={handleStakeInputClick} readOnly />
      </div>
      <div className={style.section}>
        <div className={style.side}>
          <div className={style.label}>
            <T {...dm('Odds')} />:
          </div>
          <div className={style.value}>{` : ${price.toFixed(
            settings.priceDecimalPlaceDisplay,
          )}`}</div>
        </div>
        <div className={style.side}>
          <div className={style.label}>
            <T {...dm('Potential win')} />
          </div>
          <div className={style.value}>{` : ${potentialWin}¥`}</div>
        </div>
      </div>
    </div>
  );
};

MultipleInfo.propTypes = {
  setKeyBoardHandleFunc: PropTypes.func.isRequired,
  openKeyBoard: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  stake: PropTypes.number.isRequired,
  updateStake: PropTypes.func.isRequired,
};

export default MultipleInfo;
