import React from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { NavLink } from 'react-router-dom';
import style from './Footer.scss';

const Footer = ({ gameListType, isLogin, resetClassifierSelection }) => {
  const handleGameTypeBtnClick = () => {
    resetClassifierSelection();
  };

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {Object.entries(settings.gameListTabs).map(([key, item]) => (
          <li
            key={key}
            className={classNames(
              gameListType === key && style.active,
              style.item,
              style[key],
            )}
          >
            <NavLink
              className={classNames(style.button)}
              exact
              to={`/${item.value}`}
              onClick={handleGameTypeBtnClick}
            >
              <div className={style.icon} />

              <div className={style.text}>
                <T {...dm(item.label)} />
              </div>
            </NavLink>
          </li>
        ))}
        {isLogin && (
          <li className={classNames(style.item, style.record)}>
            <NavLink className={style.button} exact to="/record">
              <div className={style.icon} />

              <div className={style.text}>
                <T {...dm('Record')} />
              </div>
            </NavLink>
          </li>
        )}
        <li className={classNames(style.item, style.betslip)}>
          <NavLink className={style.button} exact to="/betslip">
            <div className={style.icon} />

            <div className={style.text}>
              <T {...dm('Betslip')} />
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

Footer.propTypes = {
  gameListType: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
  resetClassifierSelection: PropTypes.func.isRequired,
};

export default Footer;
