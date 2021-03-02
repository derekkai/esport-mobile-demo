import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { useScrollBottomHandler } from 'helpers/customHooks';
import Loading from 'components/ShareComponent/Loading/Loading';
import { TransitionGroup } from 'react-transition-group';
import GameItemContainer from './GameItem/GameItemContainer';
import style from './ResultGameList.scss';

const ResultGameList = ({
  clearLoadDownStatus,
  clearResultGameData,
  requestResultGameData,
  keys,
  loading,
}) => {
  const onScrollButtom = () => {
    // 置底時處理事項
    requestResultGameData();
  };

  const onLeaveButtom = () => {
    // 離開底部時處理事項
    console.log('leave botton');
  };

  const catchScrollData = useScrollBottomHandler(onScrollButtom, onLeaveButtom);
  const scrollbottomEvent = event => {
    const { scrollingElement } = event.target;
    catchScrollData({
      listHeight: scrollingElement.scrollHeight - scrollingElement.clientHeight,
      scrollTop: scrollingElement.scrollTop,
      triggerHeight: 200 * 2,
    });
  };

  const renderOtherPageState = () => {
    if (loading) return <Loading className={style.loading} />;
    if (keys.length === 0)
      return <EmptyIcon className={style.emptyIcon} type="game" />;
    return null;
  };

  useEffect(() => {
    requestResultGameData();
    window.addEventListener('scroll', scrollbottomEvent);
    return () => {
      clearResultGameData();
      clearLoadDownStatus('resultGame');
      window.removeEventListener('scroll', scrollbottomEvent);
    };
  }, []);

  return (
    <div className={style.container}>
      {renderOtherPageState()}
      <TransitionGroup className={style.list} timeout={300} component="ul">
        {keys.map(gameId => (
          <GameItemContainer key={gameId} gameId={gameId} />
        ))}
      </TransitionGroup>
    </div>
  );
};

ResultGameList.propTypes = {
  clearLoadDownStatus: PropTypes.func.isRequired,
  clearResultGameData: PropTypes.func.isRequired,
  requestResultGameData: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ResultGameList;
