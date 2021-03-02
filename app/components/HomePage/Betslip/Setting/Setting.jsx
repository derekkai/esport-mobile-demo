import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withCSSTransition } from 'HOCs/hocs';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import style from './Setting.scss';

const Setting = ({
  setSettingExpanded,
  oddsFormat,
  priceChangeHandleType,
  setOddsFormat,
  setPriceChangeHandleType,
}) => {
  const handleOddFormatItemClick = value => () => {
    setOddsFormat(value);
  };

  const handleRadioBtnClick = value => () => {
    setPriceChangeHandleType(value);
  };

  const handleCloseBtnClick = () => {
    setSettingExpanded(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.header}>
          {Object.values(settings.oddsFormat).map(el => (
            <div
              aria-hidden
              className={classNames(
                style.oddsFormatBtn,
                oddsFormat === el.value && style.active,
              )}
              key={el.value}
              onChange={handleOddFormatItemClick}
            >
              <T {...dm(el.label)} />
            </div>
          ))}
          <div
            aria-hidden
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          />
        </div>
        <div className={style.body}>
          <div className={style.title}>
            <T {...dm('Automatically accept price changes')} />
          </div>
          <ul>
            {Object.values(settings.betslipPriceChangeRadioGroup).map(el => (
              <li
                aria-hidden
                className={style.item}
                key={el.value}
                onClick={handleRadioBtnClick(el.value)}
              >
                <Checkbox
                  isSelect={el.value === priceChangeHandleType}
                  shape="circle"
                />
                <div className={style.label}>
                  <T {...dm(el.label)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  setSettingExpanded: PropTypes.func.isRequired,
  oddsFormat: PropTypes.string.isRequired,
  priceChangeHandleType: PropTypes.string.isRequired,
  setOddsFormat: PropTypes.func.isRequired,
  setPriceChangeHandleType: PropTypes.func.isRequired,
};

export default withCSSTransition(Setting, 'setting');
