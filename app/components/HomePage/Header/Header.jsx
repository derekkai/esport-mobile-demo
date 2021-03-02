import React from 'react';
import { Switch, Route } from 'react-router-dom';
import style from './Header.scss';
import TopBarContainer from './TopBar/TopBarContainer';
import TopGamesContainer from './TopGames/TopGamesContainer';
import NewsContainer from './News/NewsContainer';
import MarketGameContainer from './MarketGame/MarketGameContainer';

const Header = () => {
  const renderMainHeader = () => (
    <div className={style.container}>
      <TopBarContainer />
      <TopGamesContainer />
      <NewsContainer />
    </div>
  );

  return (
    <Switch>
      <Route path="/:type/market/:id" component={MarketGameContainer} />
      <Route path="" render={() => renderMainHeader()} />
    </Switch>
  );
};

export default Header;
