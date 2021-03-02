import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import GameList from './GameList/GameList';
import ClassifierContainer from './Classifier/ClassifierContainer';
import MarketListContainer from './MarketList/MarketListContainer';
import style from './Main.scss';

const Main = ({ moveOut, requestClassifierData, gameListType }) => {
  useEffect(() => {
    requestClassifierData();
  }, [gameListType]);

  return (
    <div className={style.container}>
      <ClassifierContainer />
      {moveOut && <div className={style.mask} />}
      <Switch>
        <Route path="/:type/market/:id" component={MarketListContainer} />
        <Route path="" component={GameList} />
      </Switch>
    </div>
  );
};

Main.propTypes = {
  moveOut: PropTypes.bool.isRequired,
  requestClassifierData: PropTypes.func.isRequired,
  gameListType: PropTypes.string.isRequired,
};

export default Main;
