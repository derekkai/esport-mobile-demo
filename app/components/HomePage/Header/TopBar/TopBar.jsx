import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import logo from 'images/elements/img_index_logo.png';
import style from './TopBar.scss';

const TopBar = ({ switchClassifier, isLogin, account, balance }) => {
  const handleMenuBtnClick = () => {
    switchClassifier({ moveOut: true });
  };

  return (
    <div className={style.container}>
      <div className={style.section}>
        <div
          aria-hidden
          className={style.menuBtn}
          onClick={handleMenuBtnClick}
        />
      </div>
      <img className={style.logo} src={logo} alt="" />
      <div className={classNames(style.section)}>
        {isLogin && (
          <>
            <div className={style.text}>{account}</div>
            <div className={style.text}>
              <T {...dm('Balance')} />
              {`: ${balance}￥`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

TopBar.propTypes = {
  switchClassifier: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default TopBar;
