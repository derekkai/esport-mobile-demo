import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import { betslipTotalPrice, getBetslipOnlySystemCount } from 'helpers/common';
import { FormattedMessage as T } from 'react-intl';
import StakeInput from 'components/ShareComponent/StakeInput/StakeInput';
import { dm } from 'helpers/language';
import {
  betslipSystemCountMIN,
  betslipBetCountMAX,
  balanceDecimalPlaceDisplay,
} from 'settings';
import classNames from 'classnames';
import style from './Calculator.scss';
import Select from '../../../ShareComponent/Select/Select';

const Calculator = ({
  setCalculatorExpanded,
  openKeyBoard,
  setKeyBoardHandleFunc,
}) => {
  const [pick, setPick] = useState('2/3');
  const [stake, setStake] = useState(0);
  const [systemNum, betCount] = pick.split('/');
  const betStates = ['won', 'lost', 'returned'];
  const [betslipResultData, setBetslipResultData] = useState({});
  const count = useMemo(
    () => getBetslipOnlySystemCount(Number(betCount), Number(systemNum)),
    [betCount, systemNum],
  );
  const systemPicker = useMemo(() => {
    const result = [];
    for (let i = betslipSystemCountMIN; i <= betslipBetCountMAX; i += 1) {
      for (let j = betslipSystemCountMIN - 1; j < i; j += 1) {
        result.push({
          label: `${j} / ${i}`,
          value: `${j}/${i}`,
        });
      }
    }
    return result;
  }, []);
  const eachStake = (stake / count).toFixed(balanceDecimalPlaceDisplay);

  useEffect(() => {
    initBetslipResultData();
  }, [pick]);

  const initBetslipResultData = () => {
    const temp = {};
    for (let i = 0; i < Number(betCount); i += 1) {
      temp[i + 1] = {
        id: i + 1,
        price: 1.0,
        state: 'won',
      };
    }
    setBetslipResultData(temp);
  };

  const SystemInfo = useMemo(() => {
    const prices = [];
    Object.values(betslipResultData).forEach(bet => {
      switch (bet.state) {
        case 'won': {
          prices.push(bet.price);
          break;
        }
        case 'lost': {
          break;
        }
        case 'returned': {
          prices.push(1);
          break;
        }
        default:
          break;
      }
    });
    return betslipTotalPrice('system', prices, Number(systemNum));
  }, [betslipResultData, systemNum]);

  const handleSystemNumSelectChange = e => {
    setPick(e.target.value);
  };

  const handleCloseBtnClick = () => {
    setCalculatorExpanded(false);
  };

  const handleStakeInputClick = () => {
    openKeyBoard({ open: true, decimal: false });
    setKeyBoardHandleFunc(param => {
      setStake(param);
    });
  };

  const handleResetBtnClick = () => {
    setStake(0);
    initBetslipResultData();
    setPick('2/3');
  };

  const createTableRow = () => {
    const element = [];
    Object.values(betslipResultData).forEach(bet => {
      element.push(
        <li className={style.item} key={bet.id}>
          <div className={style.id}>{bet.id}</div>
          <input
            className={style.priceInput}
            value={bet.price}
            readOnly
            onClick={handlePriceInputClick(bet.id)}
          />
          {betStates.map(state => (
            <Checkbox
              isSelect={state === bet.state}
              key={state}
              className={style.checkbox}
              shape="circle"
              onClick={handleCheckboxChange(state, bet.id)}
            />
          ))}
        </li>,
      );
    });
    return element;
  };

  const handleCheckboxChange = (type, id) => () => {
    setBetslipResultData({
      ...betslipResultData,
      [id]: {
        ...betslipResultData[id],
        state: type,
      },
    });
  };

  const handlePriceInputClick = id => () => {
    openKeyBoard({ open: true, decimal: true });
    setKeyBoardHandleFunc(param => {
      let price = param || 0;
      if (price.length > 1 && price.startsWith('0')) {
        price = 1;
      }
      if (checkPrice(price)) {
        setBetslipResultData({
          ...betslipResultData,
          [id]: {
            ...betslipResultData[id],
            price,
          },
        });
      }
    });
  };

  const checkPrice = price => {
    const priceNum = Number(price);
    return !(
      Number.isNaN(priceNum) ||
      priceNum > 10 ||
      priceNum < 0 ||
      price.length > 5
    );
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <T {...dm('System calculator')} />
        </div>
        <div
          aria-hidden
          className={style.closeBtn}
          onClick={handleCloseBtnClick}
        />
      </div>
      <div className={style.body}>
        <div className={style.selectContainer}>
          <Select
            value={pick}
            className={style.select}
            onChange={handleSystemNumSelectChange}
          >
            {systemPicker.map(el => (
              <option key={el.value} value={el.value}>
                {el.label}
              </option>
            ))}
          </Select>
        </div>
        <StakeInput
          readOnly
          onClick={handleStakeInputClick}
          stake={stake}
          placeholder="Total Stake"
        />
        <div className={style.table}>
          <div className={style.tableHeader}>
            <div className={classNames(style.side, style.title)}>
              <T {...dm('Odds')} />
            </div>
            {betStates.map(state => (
              <div
                key={state}
                className={classNames(style.icon, style[state])}
              />
            ))}
          </div>
          <div className={style.tableBody}>
            <ul className={style.list}>{createTableRow()}</ul>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.section}>
          <div className={style.label}>
            <T {...dm('Combinations')} /> :
          </div>
          <div className={style.value}>{count}</div>
        </div>
        <div className={style.section}>
          <div className={style.label}>
            <T {...dm('Stake per combination')} /> :
          </div>
          <div className={style.value}>{eachStake}</div>
        </div>
        <div className={style.section}>
          <div className={style.label}>
            <T {...dm('Winnings')} /> :
          </div>
          <div className={style.value}>
            {((stake / count) * SystemInfo.price).toFixed(
              balanceDecimalPlaceDisplay,
            )}
          </div>
        </div>
        <div
          aria-hidden
          className={style.resetBtn}
          onClick={handleResetBtnClick}
        >
          <T {...dm('Reset')} />
        </div>
      </div>
    </div>
  );
};

Calculator.propTypes = {
  setCalculatorExpanded: PropTypes.func.isRequired,
  openKeyBoard: PropTypes.func.isRequired,
  setKeyBoardHandleFunc: PropTypes.func.isRequired,
};

export default Calculator;
