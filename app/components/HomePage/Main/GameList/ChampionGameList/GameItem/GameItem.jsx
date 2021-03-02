import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { withCSSTransition } from 'HOCs/hocs';
import { dm } from 'helpers/language';
import { timeConvert } from 'helpers/common';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Card from 'components/ShareComponent/Card/Card';
import style from './GameItem.scss';

const GameItem = ({
  competitionName,
  gameId,
  sportId,
  startTs,
  markets,
  handleSetItemIsAllEmpty,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;

  const marketsData = Object.values(markets || {});
  if (marketsData.length !== 0) {
    handleSetItemIsAllEmpty(false);
  }

  return marketsData.map(market => {
    return (
      <li className={style.container}>
        <Card>
          <Card.Header className={style.cardHeader}>
            <SportIcon
              className={style.sportIcon}
              sportId={sportId}
              type="deep_blue"
            />
            <div className={style.text}>{competitionName}</div>
            <div className={style.text}>{market.name}</div>
            <div className={style.text}>
              <T {...dm(time)} />
            </div>
          </Card.Header>
          <Card.Body className={style.cardBody}>
            {market?.event &&
              Object.values(market.event).map(eventData => (
                <div className={style.nub} key={eventData.id}>
                  <div className={style.box}>
                    <span className={style.text}>{eventData.name}</span>
                  </div>
                  <div className={style.section}>
                    <OddsButtonContainer
                      position="left"
                      sportId={sportId}
                      eventId={eventData.id}
                      gameId={gameId}
                      price={eventData.price}
                      skinId={1}
                      marketId={market.id}
                      marketType={market.market_type}
                      marketName={market.name}
                      pick={eventData.name}
                      team1Name={competitionName}
                    />
                  </div>
                </div>
              ))}
          </Card.Body>
        </Card>
      </li>
    );
  });
};

export default withCSSTransition(GameItem, 'game-item');
