import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import classNames from 'classnames';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import { usePrevious } from 'helpers/customHooks';
import style from './BetCard.scss';

const BetCard = ({
  status,
  eventId,
  sportId,
  pick,
  price,
  gameId,
  betType,
  stake,
  marketName,
  updateSingleStake,
  removeBet,
  removeBetEntity,
  setKeyBoardHandleFunc,
  openKeyBoard,
  team1Name,
  team2Name,
  setPriceNeverChange,
}) => {
  const prevPrice = usePrevious(price);
  const betName = `${team1Name} ${team2Name ? `vs ${team2Name}` : ''}`;
  const handleStakeInputClick = () => {
    openKeyBoard({ open: true, decimal: false });
    setKeyBoardHandleFunc(param => {
      updateSingleStake({ eventId, stake: param });
    });
  };
  const handleRemoveBtnClick = () => {
    removeBet({ eventId, gameId });
    removeBetEntity(eventId);
  };
  const eventNameConvert = () => {
    return pick.replace(/W1/i, team1Name).replace(/W2/i, team2Name);
  };

  useEffect(() => {
    if (prevPrice !== price) {
      setPriceNeverChange({ isChange: false });
    }
  }, [prevPrice, price]);

  return (
    <li
      className={classNames(style.container, status === 'close' && style.close)}
    >
      <div className={style.header}>
        <SportIcon
          sportId={sportId}
          type="svg"
          className={style.sportIcon}
          viewBox="0 0 20 20"
        />
        <div className={style.title}>{betName}</div>
        <div
          aria-hidden
          className={style.removeBtn}
          onClick={handleRemoveBtnClick}
        />
      </div>
      <div className={style.body}>
        <div className={style.text}>{marketName}</div>
        {price !== prevPrice && status !== 'close' && (
          <div
            className={classNames(
              style.text,
              price !== prevPrice && style.strikethrough,
            )}
          >
            {prevPrice.toFixed(settings.priceDecimalPlaceDisplay)}
          </div>
        )}
      </div>
      <div className={style.footer}>
        <div className={style.text}>{eventNameConvert()}</div>
        <div
          className={classNames(
            style.text,
            price > prevPrice && style.increase,
            price < prevPrice && style.decrease,
          )}
        >
          {price.toFixed(settings.priceDecimalPlaceDisplay)}
        </div>
      </div>
      {status === 'close' ? (
        <div className={style.closeTips}>
          <div className={style.lock} />
          <div>
            <T {...dm('Bet is close.')} />
          </div>
        </div>
      ) : (
        betType === 'single' && (
          <div className={style.stakeInput}>
            <StakeInput
              stake={stake}
              onClick={handleStakeInputClick}
              readOnly
            />
          </div>
        )
      )}
    </li>
  );
};

BetCard.propTypes = {
  status: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  marketId: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  marketName: PropTypes.string.isRequired,
  pick: PropTypes.string.isRequired,
  openKeyBoard: PropTypes.func,
  setKeyBoardHandleFunc: PropTypes.func,
  price: PropTypes.number.isRequired,
  reason: PropTypes.string,
  removeBet: PropTypes.func.isRequired,
  removeBetEntity: PropTypes.func.isRequired,
  setPriceNeverChange: PropTypes.func.isRequired,
  stake: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  betType: PropTypes.string.isRequired,
  updateSingleStake: PropTypes.func,
};

export default BetCard;
