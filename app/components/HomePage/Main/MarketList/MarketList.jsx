import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { unsubscribeHandler } from 'sagas/websocket';
import HeaderFlag from '../../../ShareComponent/HeaderFlag/HeaderFlag';
import EventTable from './EventTable/EventTable';
import style from './MarketList.scss';

const MarketList = ({
  match,
  requestMarketListData,
  setMarketGameInfoGameId,
  clearUpcomingMarketData,
  clearResultMarketData,
  groups,
  data,
  tabs,
  sportId,
  gameId,
  team1Name,
  team2Name,
}) => {
  const [activeTab, setActiveTab] = useState('0');
  // 將相同的 market 組合起來
  const marketData = {};
  Object.values(data)
    .filter(el => groups[activeTab].value.includes(el.id))
    .forEach(market => {
      const { market_type, name } = market;
      const key = `${market_type}${name}`;
      if (!marketData[key]) {
        // 以 NameId 當作排序依據
        marketData[key] = { order: market.NameId, markets: [market] };
      } else {
        marketData[key].markets.push(market);
      }
    });
  // 依照 order 排序
  const marketDataList = Object.entries(marketData).sort(
    ([, itemA], [, itemB]) => itemA.order - itemB.order,
  );

  const handleTabChange = value => {
    setActiveTab(value);
  };

  useEffect(() => {
    const { type, id } = match.params;
    setMarketGameInfoGameId(id);
    requestMarketListData();
    return () => {
      unsubscribeHandler('upcomingMarket');
      switch (type) {
        case 'upcoming': {
          clearUpcomingMarketData();
          break;
        }
        case 'result': {
          clearResultMarketData();
          break;
        }
        default:
          break;
      }
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.navBar}>
        {tabs.map(([key, el]) => (
          <HeaderFlag
            key={key}
            className={style.flag}
            text={el.label}
            value={el.value}
            active={key === activeTab}
            onClick={handleTabChange}
          />
        ))}
      </div>
      <div>
        <ul>
          {marketDataList.map(([key, { markets }]) => (
            <EventTable
              sportId={sportId}
              gameId={gameId}
              key={key}
              data={markets}
              team1Name={team1Name}
              team2Name={team2Name}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(MarketList);
