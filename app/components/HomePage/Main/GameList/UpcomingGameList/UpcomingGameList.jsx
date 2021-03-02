import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { unsubscribeHandler } from 'sagas/websocket';
import { TransitionGroup } from 'react-transition-group';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import { useScrollBottomHandler } from 'helpers/customHooks';
import Loading from 'components/ShareComponent/Loading/Loading';
import GameItemContainer from './GameItem/GameItemContainer';
import style from './UpcomingGameList.scss';

const UpcomingGameList = ({
  keys,
  setUpcomingGameUIState,
  requestUpcomingGameData,
  displayItemCount,
  loading,
  clearUpcomingGameData,
  clearLoadDownStatus,
}) => {
  const displayItemCountRef = useRef(displayItemCount);

  const onScrollButtom = () => {
    // 置底時處理事項
    console.log('botton');
    if (!loading) {
      setUpcomingGameUIState({
        displayItemCount: displayItemCountRef.current + 12,
      });
    }
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
    requestUpcomingGameData();
    window.addEventListener('scroll', scrollbottomEvent);
    return () => {
      unsubscribeHandler('upcomingGame');
      clearUpcomingGameData();
      clearLoadDownStatus('upcomingGame');
      window.removeEventListener('scroll', scrollbottomEvent);
    };
  }, []);

  useEffect(() => {
    displayItemCountRef.current = displayItemCount;
  }, [displayItemCount]);

  return (
    <div className={style.container}>
      {renderOtherPageState()}
      <TransitionGroup timeout={300} className={style.list} component="ul">
        {keys
          .filter((_, index) => index < displayItemCount)
          .map(gameId => (
            <GameItemContainer key={gameId} gameId={gameId} />
          ))}
      </TransitionGroup>
    </div>
  );
};

UpcomingGameList.propTypes = {
  keys: PropTypes.array.isRequired,
  setUpcomingGameUIState: PropTypes.func.isRequired,
  requestUpcomingGameData: PropTypes.func.isRequired,
  displayItemCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  clearUpcomingGameData: PropTypes.func.isRequired,
  clearLoadDownStatus: PropTypes.func.isRequired,
};

export default UpcomingGameList;
