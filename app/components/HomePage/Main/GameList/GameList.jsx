import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UpcomingGameListContainer from './UpcomingGameList/UpcomingGameListContainer';
import ChampionGameListContainer from './ChampionGameList/ChampionGameListContainer';
import ResultGameListContainer from './ResultGameList/ResultGameListContainer';

const GameList = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <UpcomingGameListContainer {...props} />}
        />
        <Route
          path="/champion"
          render={props => <ChampionGameListContainer {...props} />}
        />
        <Route
          path="/result"
          render={props => <ResultGameListContainer {...props} />}
        />
      </Switch>
    </div>
  );
};

export default GameList;
