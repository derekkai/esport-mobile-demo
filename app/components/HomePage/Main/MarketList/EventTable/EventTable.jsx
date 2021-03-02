import React, { useState } from 'react';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import Chip from 'components/ShareComponent/Chip/Chip';
import MarketLock from 'components/ShareComponent/MarketLock/MarketLock';
import Card from 'components/ShareComponent/Card/Card';
import OddsButtonContainer from 'components/ShareComponent/OddsButton/OddsButtonContainer';
import style from './EventTable.scss';

const EventTable = ({ data, team1Name, team2Name, sportId, gameId }) => {
  const [expanded, setExpanded] = useState(true);
  const { name, id, market_type } = data[0];

  const handleArrowClick = () => {
    setExpanded(prevState => !prevState);
  };

  const renderOdds = (result, price, eventId, eventName) => {
    // 賽事、賽果 分別顯示不同資訊
    if (!result)
      return (
        <OddsButtonContainer
          position="left"
          sportId={sportId}
          price={price}
          skinId={2}
          gameId={gameId}
          marketId={id}
          marketType={market_type}
          marketName={name}
          pick={eventName}
          team1Name={team1Name}
          team2Name={team2Name}
          eventId={eventId}
        />
      );
    switch (result) {
      case 1:
      case 2:
        return (
          <Chip
            size="sm"
            className={style.chip}
            type={result === 1 ? 'Won' : 'Lost'}
          />
        );
      case 3:
        return <Chip size="sm" className={style.chip} type="CXL" />;
      default:
        return undefined;
    }
  };

  return (
    <li className={style.container}>
      <Card>
        <Card.Header className={style.cardHeader}>
          <div className={style.marketName}>{name}</div>
          <Arrow active={expanded} onClick={handleArrowClick} />
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <ul
            className={style.marketList}
            style={{ height: expanded ? `${50 * data.length}px` : '0px' }}
          >
            {data
              .sort((a, b) => a.base - b.base)
              .map(market => (
                // render markets
                <li className={style.marketItem} key={market.id}>
                  <ul className={style.eventList}>
                    {market.event ? (
                      Object.values(market.event)
                        .sort((a, b) => a.order - b.order)
                        .map(event => {
                          // render events
                          let eventName = event.name;
                          if (event.name.includes('W1')) {
                            eventName = team1Name;
                          } else if (event.name.includes('W2')) {
                            eventName = team2Name;
                          }
                          return (
                            <li key={event.id} className={style.eventItem}>
                              <div className={style.eventNameContainer}>
                                <div className={style.eventName}>
                                  {eventName}
                                </div>
                                {event.base && <div>({event.base})</div>}
                              </div>
                              {renderOdds(
                                event.result,
                                event.price,
                                event.id,
                                event.name,
                              )}
                            </li>
                          );
                        })
                    ) : (
                      <MarketLock />
                    )}
                  </ul>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
    </li>
  );
};

export default EventTable;
