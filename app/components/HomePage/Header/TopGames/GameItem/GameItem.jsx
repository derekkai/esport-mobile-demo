import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import style from './GameItem.scss';

const GameItem = ({
  market,
  sportId,
  competitionName,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  haveVideo,
  type,
  startTs,
  gameId,
  team1Score,
  team2Score,
  marketsCount,
}) => {
  let team1Price = 0;
  let team2Price = 0;
  let drawPrice = 0;
  let team1EventId;
  let team2EventId;
  let drawEventId;
  let team1EventName = '';
  let team2EventName = '';
  let drawEventName = '';

  const events = Object.values(market?.event || {}).sort(
    (a, b) => a.order - b.order,
  );

  if (market?.market_type === 'MatchWinner') {
    team1Price = events[0]?.price || 0;
    team1EventId = events[0]?.id || undefined;
    team1EventName = events[0]?.name || '';
    team2Price = events[1]?.price || 0;
    team2EventId = events[1]?.id || undefined;
    team2EventName = events[1]?.name || '';
  } else if (market?.market_type === 'MatchResult') {
    team1Price = events[0]?.price || 0;
    team1EventId = events[0]?.id || undefined;
    team1EventName = events[0]?.name || '';
    drawPrice = events[1]?.price || 0;
    drawEventId = events[1]?.id || undefined;
    drawEventName = events[1]?.name || '';
    team2Price = events[2]?.price || 0;
    team2EventId = events[2]?.id || undefined;
    team2EventName = events[2]?.name || '';
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <SportIcon
          sportId={sportId}
          className={style.sportIcon}
          type="light_blue"
        />
        <div>{competitionName}</div>
      </div>
      <div className={style.body}>
        <div className={classNames(style.side, style.left)}>
          <div className={style.iconBg}>
            <TeamIcon teamId={team1Id} teamName={team1Name} size="small" />
          </div>
          <div className={style.box}>
            <div className={style.text}>{team1Name}</div>
          </div>
        </div>
        <div className={style.main}>
          <div className={style.status}>
            <GameStatusDisplay
              haveVideo={haveVideo}
              type={type}
              isDark
              timestamp={startTs}
            />
          </div>
          <div className={style.score}>
            <div>{team1Score}</div>
            <div className={style.divider}>:</div>
            <div>{team2Score}</div>
          </div>
          <div className={style.events}>
            <OddsButtonContainer
              className={style.oddsBtn}
              sportId={sportId}
              price={team1Price}
              skinId={3}
              gameId={gameId}
              marketId={market?.id}
              eventId={team1EventId}
              marketType={market?.market_type}
              marketName={market?.name}
              pick={team1EventName}
              team1Name={team1Name}
              team2Name={team2Name}
            />
            {market?.market_type === 'MatchResult' && (
              <OddsButtonContainer
                className={style.oddsBtn}
                sportId={sportId}
                price={drawPrice}
                skinId={3}
                gameId={gameId}
                marketId={market?.id}
                eventId={drawEventId}
                marketType={market?.market_type}
                marketName={market?.name}
                pick={drawEventName}
                team1Name={team1Name}
                team2Name={team2Name}
              />
            )}
            <OddsButtonContainer
              className={style.oddsBtn}
              sportId={sportId}
              price={team2Price}
              skinId={3}
              gameId={gameId}
              marketId={market?.id}
              eventId={team2EventId}
              marketType={market?.market_type}
              marketName={market?.name}
              pick={team2EventName}
              team1Name={team1Name}
              team2Name={team2Name}
            />
          </div>
          <div className={style.buttons}>
            <MoreInfoButtonContainer
              type="market"
              dataType="upcoming"
              disable={marketsCount === 0}
              gameId={gameId}
              sportId={sportId}
            />
          </div>
        </div>
        <div className={classNames(style.side, style.right)}>
          <div className={style.iconBg}>
            <TeamIcon teamId={team2Id} teamName={team2Name} size="small" />
          </div>
          <div className={style.box}>
            <div className={style.text}>{team2Name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
GameItem.propTypes = {
  market: PropTypes.object,
  sportId: PropTypes.number,
  competitionName: PropTypes.string.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  haveVideo: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  marketsCount: PropTypes.number.isRequired,
};

export default GameItem;
