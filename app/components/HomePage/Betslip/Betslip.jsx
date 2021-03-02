import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import betSuccessGif from 'images/elements/bet_success.gif';
import betFailGif from 'images/elements/bet_fail.gif';
import betProgress from 'images/elements/bet_progress.gif';
import { withCSSTransition } from 'HOCs/hocs';
import { withRouter } from 'react-router-dom';
import SystemNumBarContainer from './SystemNumBar/SystemNumBarContainer';
import style from './Betslip.scss';
import BetListContainer from './BetList/BetListContainer';
import BetslipInfoContainer from './BetslipInfo/BetslipInfoContainer';
import CalculatorContainer from './Calculator/CalculatorContainer';
import SettingContainer from './Setting/SettingContainer';

const Betslip = ({
  clearBetslipData,
  betType,
  setBetType,
  removeBetsKey,
  removeBetEntity,
  keys,
  history,
  showResult,
  isWaitingResponse,
  failCode,
  isSuccess,
  requestUpdateBetEventData,
  betCount,
}) => {
  const [isSettingExpanded, setSettingExpanded] = useState(false);
  const [disableBetTypes, setDisableBetTypes] = useState([]);
  const [isCalculatorExpanded, setCalculatorExpanded] = useState(false);

  const handleBetTypeBtnClick = value => () => {
    if (!disableBetTypes.includes(value)) {
      setBetType(value);
    }
  };

  const handleClearBtnClick = () => {
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      removeBetsKey(keys[i]);
      removeBetEntity(keys[i]);
    }
    clearBetslipData();
  };

  const handleSettingBtnClick = () => {
    setSettingExpanded(prevState => !prevState);
    setCalculatorExpanded(false);
  };

  const handleCalculatorBtnClick = () => {
    setCalculatorExpanded(prevState => !prevState);
    setSettingExpanded(false);
  };

  const handleGoBackBtnClick = () => {
    history.goBack();
  };

  const renderDoBetState = () => {
    if (showResult) {
      return (
        <div className={style.mask}>
          <img
            className={style.icon}
            src={isSuccess ? betSuccessGif : betFailGif}
            alt=""
          />
          <div
            className={classNames(
              style.text,
              isSuccess ? style.success : style.fail,
            )}
          >
            {Object.values(settings.serverCode).includes(failCode) ? (
              <T {...dm(`ServerMessage${failCode}`)} />
            ) : (
              <T {...dm('Place bet fail.')} />
            )}
          </div>
        </div>
      );
    }
    if (isWaitingResponse) {
      return (
        <div className={style.mask}>
          <img className={style.icon} src={betProgress} alt="" />
          <div className={style.text}>
            <T {...dm('Processing...')} />
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (keys.length < 2) {
      setDisableBetTypes(['system', 'multiple']);
    } else if (keys.length < 3) {
      setDisableBetTypes(['system']);
    } else {
      setDisableBetTypes([]);
    }
  }, [keys]);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    if (betCount > 0) {
      requestUpdateBetEventData();
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          aria-hidden
          onClick={handleGoBackBtnClick}
          className={style.goBackBtn}
        />
        <div className={style.title}>
          <T {...dm('Betslip')} />
        </div>
        <div className={style.iconButtonContainer}>
          <div
            aria-hidden
            className={classNames(
              style.iconButton,
              style.calculate,
              isCalculatorExpanded && style.active,
            )}
            onClick={handleCalculatorBtnClick}
          />
          <div
            aria-hidden
            className={classNames(
              style.iconButton,
              style.settings,
              isSettingExpanded && style.active,
            )}
            onClick={handleSettingBtnClick}
          />
          <div
            aria-hidden
            className={classNames(style.clear, style.iconButton)}
            onClick={handleClearBtnClick}
          />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.betTypeNavbar}>
          {Object.values(settings.betslipBetTypeItems).map(item => (
            <div
              key={item.label}
              aria-hidden
              className={classNames(
                style.nav,
                item.value === betType && style.active,
                disableBetTypes.includes(item.value) && style.disable,
              )}
              onClick={handleBetTypeBtnClick(item.value)}
            >
              <T {...dm(item.label)} />
            </div>
          ))}
        </div>
        {betType === 'system' && <SystemNumBarContainer />}
        <ul className={style.list}>
          <BetListContainer />
        </ul>
      </div>
      <div className={style.footer}>
        <BetslipInfoContainer />
      </div>
      <SettingContainer
        in={isSettingExpanded}
        setSettingExpanded={setSettingExpanded}
      />
      {isCalculatorExpanded && (
        <CalculatorContainer setCalculatorExpanded={setCalculatorExpanded} />
      )}
      {renderDoBetState()}
    </div>
  );
};

Betslip.propTypes = {
  clearBetslipData: PropTypes.func.isRequired,
  betType: PropTypes.string.isRequired,
  setBetType: PropTypes.func.isRequired,
  removeBetsKey: PropTypes.func.isRequired,
  removeBetEntity: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  showResult: PropTypes.bool.isRequired,
  isWaitingResponse: PropTypes.bool.isRequired,
  failCode: PropTypes.number.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  requestUpdateBetEventData: PropTypes.func.isRequired,
  betCount: PropTypes.number.isRequired,
};

export default withRouter(withCSSTransition(Betslip, 'Betslip'));
