import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { withCSSTransition } from 'HOCs/hocs';
import BetHistoryContainer from './BetHistory/BetHistoryContainer';
import BalanceHistoryContainer from './BalanceHistory/BalanceHistoryContainer';
import style from './Record.scss';

const Record = ({ history }) => {
  const [dataType, setDataType] = useState('betHistory');
  const handleGoBackBtnClick = () => {
    history.goBack();
  };

  const handleNavBtnClick = value => () => {
    setDataType(value);
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          aria-hidden
          className={style.goBackBtn}
          onClick={handleGoBackBtnClick}
        />
        <div className={style.title}>
          <T {...dm('Record')} />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.navbar}>
          {Object.values(settings.recordNavItem).map(item => (
            <div
              key={item.value}
              aria-hidden
              onClick={handleNavBtnClick(item.value)}
              className={classNames(
                style.nav,
                dataType === item.value && style.active,
              )}
            >
              <T {...dm(item.label)} />
            </div>
          ))}
        </div>
        {
          {
            betHistory: <BetHistoryContainer />,
            balanceHistory: <BalanceHistoryContainer />,
          }[dataType]
        }
      </div>
    </div>
  );
};

Record.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(withCSSTransition(Record, 'Record'));
