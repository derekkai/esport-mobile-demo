import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { CSSTransition } from 'react-transition-group';
import { useInterval } from 'helpers/customHooks';
import { newsStayTime } from 'settings';
import style from './News.scss';

const News = ({ entity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useInterval(() => {
    setCurrentIndex(prevState => {
      if (prevState + 1 > entity.length - 1) {
        return 0;
      }
      return prevState + 1;
    });
  }, newsStayTime);

  useEffect(() => {
    if (currentIndex > entity.length - 1) {
      setCurrentIndex(0);
    }
  }, [entity]);

  if (entity.length === 0) return null;
  return (
    <NavLink className={style.container} to="/news">
      <div className={style.tag} />
      <div>
        <T {...dm('News')} />:
      </div>
      {entity.map((el, index) => (
        <CSSTransition
          key={el.id}
          in={currentIndex === index}
          unmountOnExit
          classNames="carousel"
          timeout={300}
        >
          <div className={style.content}>{el.Title}</div>
        </CSSTransition>
      ))}
    </NavLink>
  );
};

News.propTypes = {
  entity: PropTypes.array.isRequired,
};

export default News;
