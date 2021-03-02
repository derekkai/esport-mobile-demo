import React from 'react';
import PropTypes from 'prop-types';
import { usePrevious, useOddsStatus } from 'helpers/customHooks';
import settings from 'settings';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';

const OddsButton = ({
  callBack = () => {},
  delayMS = 0,
  sportId,
  price,
  skinId,
  isInBetslip,
  requestAddBet,
  removeBet,
  marketId,
  gameId,
  eventId,
  marketType,
  pick,
  team1Name,
  team2Name,
  position,
  marketName,
  className,
  removeBetEntity,
}) => {
  const prePrice = usePrevious(price);
  const [oddsStatus, isArrowUp] = useOddsStatus(price, prePrice, isInBetslip);

  const handleBtnClick = () => {
    if (!isInBetslip) {
      callBack();
      setTimeout(() => {
        requestAddBet({
          sportId,
          marketId,
          gameId,
          pick,
          eventId,
          team1Name,
          team2Name,
          marketType,
          price,
          marketName,
        });
      }, delayMS);
    } else {
      removeBet({ eventId, gameId });
      removeBetEntity(eventId);
    }
  };

  return (
    <SmartButton
      className={className}
      isArrowUp={isArrowUp.current}
      position={position}
      text={price.toFixed(settings.priceDecimalPlaceDisplay)}
      skinId={skinId}
      status={oddsStatus.current}
      onClick={handleBtnClick}
    />
  );
};

OddsButton.propTypes = {
  callBack: PropTypes.func,
  delayMS: PropTypes.number,
  sportId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  skinId: PropTypes.number.isRequired,
  isInBetslip: PropTypes.bool.isRequired,
  requestAddBet: PropTypes.func.isRequired,
  removeBet: PropTypes.func.isRequired,
  marketId: PropTypes.number,
  gameId: PropTypes.number.isRequired,
  eventId: PropTypes.number,
  marketType: PropTypes.string,
  position: PropTypes.string,
  marketName: PropTypes.string,
  pick: PropTypes.string.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string,
  className: PropTypes.string,
  removeBetEntity: PropTypes.func.isRequired,
};

export default OddsButton;
