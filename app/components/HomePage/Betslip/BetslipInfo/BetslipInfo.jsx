import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './BetslipInfo.scss';
import MultipleInfoContainer from './MultipleInfo/MultipleInfoContainer';
import SingleInfoContainer from './SingleInfo/SingleInfoContainer';
import SystemInfoContainer from './SystemInfo/SystemInfoContainer';

const BetslipInfo = ({
  betCount,
  betType,
  priceChangeHandleType,
  priceNeverChange,
  requestDoBet,
}) => {
  const handleDoBetBtnClick = () => {
    requestDoBet();
  };
  const renderInfo = () => {
    switch (betType) {
      case 'single':
        return <SingleInfoContainer />;
      case 'multiple':
        return <MultipleInfoContainer />;
      case 'system':
        return <SystemInfoContainer />;
      default:
        return undefined;
    }
  };

  return (
    <div className={className(style.container, betCount === 0 && style.hide)}>
      {renderInfo()}
      <div
        aria-hidden
        className={style.placeBetsBtn}
        onClick={handleDoBetBtnClick}
      >
        {!priceNeverChange && priceChangeHandleType !== 'free' ? (
          <T {...dm('Accept changes and place bets.')} />
        ) : (
          <T {...dm('Place bets!')} />
        )}
      </div>
    </div>
  );
};

BetslipInfo.propTypes = {
  betCount: PropTypes.number.isRequired,
  betType: PropTypes.string.isRequired,
  priceChangeHandleType: PropTypes.string.isRequired,
  priceNeverChange: PropTypes.bool.isRequired,
  requestDoBet: PropTypes.func.isRequired,
};

export default BetslipInfo;
