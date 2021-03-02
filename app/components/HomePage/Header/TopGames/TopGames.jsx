import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSwipe from 'react-swipe';
import style from './TopGames.scss';
import GameItemContainer from './GameItem/GameItemContainer';

const TopGames = ({ keys }) => {
  const reactSwipeEl = useRef(null);
  const swipeIndexEL = useRef(null);
  const handleSlideChange = () => {
    swipeIndexEL.current.setIndex(reactSwipeEl.current.getPos());
  };

  return (
    <div>
      <ReactSwipe
        swipeOptions={{
          callback: handleSlideChange,
        }}
        className={style.swiper}
        key={keys.length}
        ref={reactSwipeEl}
      >
        {keys.map(gameId => (
          <div key={gameId}>
            <GameItemContainer gameId={gameId} />
          </div>
        ))}
      </ReactSwipe>
      <DisplaySwipeIndex keys={keys} ref={swipeIndexEL} />
    </div>
  );
};

const DisplaySwipeIndex = forwardRef(({ keys }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    setIndex(value) {
      setCurrentIndex(value);
    },
  }));

  return (
    <div className={style.displayIndexContainer}>
      {keys.map((gameId, index) => (
        <div
          key={gameId}
          className={classNames(
            style.spot,
            currentIndex === index && style.active,
          )}
        />
      ))}
    </div>
  );
});

TopGames.propTypes = {
  keys: PropTypes.array.isRequired,
};

DisplaySwipeIndex.propTypes = {
  keys: PropTypes.array.isRequired,
};

export default TopGames;
