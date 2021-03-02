import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { unsubscribeHandler } from 'sagas/websocket';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import Loading from 'components/ShareComponent/Loading/Loading';
import { TransitionGroup } from 'react-transition-group';
import style from './ChampionGameList.scss';
import GameItemContainer from './GameItem/GameItemContainer';

const ChampionGameList = ({
  keys,
  loading,
  requestChampionGameData,
  clearChampionGameData,
  clearLoadDownStatus,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSetItemIsAllEmpty = value => {
    setIsEmpty(value);
  };

  const renderOtherPageState = () => {
    if (loading) return <Loading className={style.loading} />;
    if (isEmpty) return <EmptyIcon className={style.emptyIcon} type="game" />;
    return null;
  };

  useEffect(() => {
    requestChampionGameData();
    return () => {
      unsubscribeHandler('championGame');
      clearChampionGameData();
      clearLoadDownStatus('championGame');
    };
  }, []);

  return (
    <div className={style.container}>
      {renderOtherPageState()}
      <TransitionGroup className={style.list} timeout={300} component="ul">
        {keys.map(gameId => (
          <GameItemContainer
            key={gameId}
            gameId={gameId}
            handleSetItemIsAllEmpty={handleSetItemIsAllEmpty}
          />
        ))}
      </TransitionGroup>
    </div>
  );
};

ChampionGameList.propTypes = {
  keys: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  requestChampionGameData: PropTypes.func.isRequired,
  clearChampionGameData: PropTypes.func.isRequired,
  clearLoadDownStatus: PropTypes.func.isRequired,
};

export default ChampionGameList;
