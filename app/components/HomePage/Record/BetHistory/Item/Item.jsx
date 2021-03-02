import React, { useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import classNames from 'classnames';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import Chip from 'components/ShareComponent/Chip/Chip';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { timeConvert, getBetslipOnlySystemCount } from 'helpers/common';
import style from './Item.scss';

const Item = ({ data }) => {
  const {
    BetID,
    BettingDate,
    BetTypeName,
    BettingAmount,
    BetStateName,
    BettingResultAmount,
    TotalPrice,
    Selections,
    SystemMinCount,
  } = data;
  const { hours, day, minute, month } = timeConvert(BettingDate);
  const date = `${month}/${day} ${hours}:${minute}`;
  const [expanded, setExpanded] = useState(false);
  const handleArrowBtnClick = () => {
    setExpanded(prevState => !prevState);
  };
  const createPotentialWin = () => {
    if (BetTypeName === 'System') {
      const sysCount = getBetslipOnlySystemCount(
        Selections.length,
        SystemMinCount,
      );
      return ((BettingAmount / sysCount) * TotalPrice).toFixed(
        settings.balanceDecimalPlaceDisplay,
      );
    }
    return (BettingAmount * TotalPrice).toFixed(
      settings.balanceDecimalPlaceDisplay,
    );
  };

  const haveResult = BetStateName !== settings.betHistoryNoResultStateName;
  const resultAmount = haveResult
    ? BettingResultAmount.toFixed(settings.balanceDecimalPlaceDisplay)
    : createPotentialWin();

  return (
    <li className={style.container}>
      <div className={style.header}>
        <div>{`ID ${BetID}`}</div>
        <div>{date}</div>
      </div>
      <div className={style.body}>
        <div className={style.gain}>
          <div className={style.stake}>
            <T {...dm('Stake')} />
            {` : ${BettingAmount} ¥`}
          </div>
          <div className={style.potentialWin}>
            {haveResult ? (
              <T {...dm('Earn')} />
            ) : (
              <T {...dm('Potential win')} />
            )}
            {` : ${resultAmount} ¥`}
          </div>
        </div>
        <div className={style.betType}>
          <T {...dm(BetTypeName)} />
        </div>
        <div className={style.betStatus}>
          <Chip className={style.chip} size="sm" type={BetStateName} />
        </div>
        <div className={style.arrowBtn}>
          <Arrow active={expanded} onClick={handleArrowBtnClick} />
        </div>
      </div>
      <div>
        {expanded && (
          <ul>
            {Selections.map(bet => {
              const {
                SportId,
                CompetitionName,
                MarketName,
                SelectionName,
                Price,
                BetSelState,
                Team1Name,
                Team2Name,
                Team1Id,
                Team2Id,
                MatchStartDate,
              } = bet;
              let selectionName = SelectionName;
              if (SelectionName.includes('W1')) selectionName = Team1Name;
              if (SelectionName.includes('W2')) selectionName = Team2Name;
              return (
                <li
                  key={Team1Id + Team2Id + MatchStartDate}
                  className={style.item}
                >
                  <div className={style.icon}>
                    <SportIcon
                      sportId={SportId}
                      className={style.sportIcon}
                      type="deep_blue"
                    />
                  </div>
                  <div className={style.market}>
                    <div className={style.componentName}>{CompetitionName}</div>
                    <div className={style.marketName}>{MarketName}</div>
                  </div>
                  <div className={style.event}>
                    <div className={style.price}>
                      <T {...dm('Odds')} />
                      {` : ${Price}`}
                    </div>
                    <div className={style.eventName}>{selectionName}</div>
                  </div>
                  <div
                    className={classNames(
                      style[BetSelState],
                      style.eventResult,
                    )}
                  >
                    <T {...dm(BetSelState)} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Item;
