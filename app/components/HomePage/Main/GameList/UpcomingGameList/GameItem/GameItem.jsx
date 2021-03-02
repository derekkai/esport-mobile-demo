import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withCSSTransition } from 'HOCs/hocs';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import Card from 'components/ShareComponent/Card/Card';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import style from './GameItem.scss';

const GameItem = ({
  sportId,
  competitionName,
  marketsCount,
  gameId,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  market,
  haveVideo,
  type,
  startTs,
  team1Score,
  team2Score,
}) => {
  const duration = 0;

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
    <li gameid={gameId} className={style.wrapper}>
      <Card>
        <Card.Header className={style.cardHeader}>
          <SportIcon
            className={style.sportIcon}
            sportId={sportId}
            type="deep_blue"
          />
          <div className={style.text}>{competitionName}</div>
          <MoreInfoButtonContainer
            className={style.more}
            light={false}
            type="market"
            dataType="upcoming"
            disable={marketsCount === 0}
            gameId={gameId}
            sportId={sportId}
          />
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <div className={style.side}>
            <div className={style.content}>
              <TeamIcon teamId={team1Id} teamName={team1Name} size="small" />
              <div className={style.box}>
                <div className={style.text}>{team1Name}</div>
              </div>
            </div>
            <div className={style.section}>
              <OddsButtonContainer
                position="vertical"
                delayMS={duration}
                sportId={sportId}
                price={team1Price}
                skinId={1}
                gameId={gameId}
                marketId={market?.id}
                eventId={team1EventId}
                marketType={market?.market_type}
                marketName={market?.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={team1EventName}
              />
            </div>
          </div>
          <div className={style.main}>
            <div className={style.status}>
              <GameStatusDisplay
                haveVideo={haveVideo}
                type={type}
                timestamp={startTs}
              />
            </div>
            <div className={style.score}>
              <div className={classNames(style.text, style.left)}>
                {team1Score}
              </div>
              <div className={style.divider}>:</div>
              <div className={classNames(style.text, style.right)}>
                {team2Score}
              </div>
            </div>
            <div className={style.section}>
              {market?.market_type === 'MatchResult' && (
                <OddsButtonContainer
                  position="vertical"
                  delayMS={duration}
                  sportId={sportId}
                  price={drawPrice}
                  skinId={1}
                  gameId={gameId}
                  marketId={market?.id}
                  eventId={drawEventId}
                  marketType={market?.market_type}
                  marketName={market?.name}
                  team1Name={team1Name}
                  team2Name={team2Name}
                  pick={drawEventName}
                />
              )}
            </div>
          </div>
          <div className={classNames(style.side, style.right)}>
            <div className={style.content}>
              <TeamIcon teamId={team2Id} teamName={team2Name} size="small" />
              <div className={style.box}>
                <div className={style.text}>{team2Name}</div>
              </div>
            </div>
            <div className={style.section}>
              <OddsButtonContainer
                position="vertical"
                delayMS={duration}
                sportId={sportId}
                price={team2Price}
                skinId={1}
                gameId={gameId}
                marketId={market?.id}
                eventId={team2EventId}
                marketType={market?.market_type}
                marketName={market?.name}
                team1Name={team1Name}
                team2Name={team2Name}
                pick={team2EventName}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
};

GameItem.propTypes = {
  sportId: PropTypes.number.isRequired,
  competitionName: PropTypes.string.isRequired,
  marketsCount: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  market: PropTypes.object,
  haveVideo: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
};

export default withCSSTransition(GameItem, 'game-item');
