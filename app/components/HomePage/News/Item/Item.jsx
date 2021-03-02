import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import style from './Item.scss';

const Item = ({ type, title, date, content }) => {
  const [isPopupDisplay, setPopupDisplay] = useState(false);
  const handleCardClick = () => {
    setPopupDisplay(true);
  };

  const handleClosePopupBtnClick = () => {
    setPopupDisplay(false);
  };
  return (
    <li className={style.container}>
      <div aria-hidden className={style.card} onClick={handleCardClick}>
        <div
          className={classNames(
            style.icon,
            type === 1 ? style.system : style.activity,
          )}
        />
        <div className={style.section}>
          <div className={style.title}>{title}</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
      <CSSTransition
        timeout={300}
        classNames="news-content-popup"
        in={isPopupDisplay}
        unmountOnExit
      >
        <div className={style.popup}>
          <div className={style.box}>
            <div className={style.header}>
              <div
                className={classNames(
                  style.icon,
                  type === 1 ? style.system : style.activity,
                )}
              />
              <div className={style.title}>{title}</div>
              <div
                aria-hidden
                className={style.closeBtn}
                onClick={handleClosePopupBtnClick}
              />
            </div>
            <div className={style.body}>{content}</div>
            <div className={style.footer}>{date}</div>
          </div>
        </div>
      </CSSTransition>
    </li>
  );
};

Item.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Item;
