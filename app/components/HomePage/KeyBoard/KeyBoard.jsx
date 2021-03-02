import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './KeyBoard.scss';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const hotkey = ['0', '00'];

const KeyBord = ({
  isKeyBoardDecimal,
  isKeyBoardOpen,
  openKeyBoard,
  keyBoardHandleFunc,
}) => {
  if (isKeyBoardDecimal) {
    hotkey.push('.');
  }
  const [amount, setAmount] = useState('0');
  const handleNumberBtnClick = number => () => {
    if (amount.includes('.') && number === '.') {
      return;
    }
    if (amount === '0' && number === '00') {
      return;
    }
    if (amount === '0' && number !== '.') {
      handleSetAmount(number);
    } else {
      handleSetAmount(`${amount}${number}`);
    }
  };

  const handleBackSpaceBtnClick = () => {
    if (amount.length === 1) {
      handleSetAmount('0');
    } else {
      handleSetAmount(amount.slice(0, amount.length - 1));
    }
  };

  const handleClearBtnClick = () => {
    handleSetAmount('0');
  };

  const handleKeyBoardBlur = () => {
    openKeyBoard({ open: false });
  };

  useEffect(() => {
    if (isKeyBoardOpen) {
      handleSetAmount('0');
    }
  }, [isKeyBoardOpen]);

  const handleDownBtnClick = () => {
    keyBoardHandleFunc(amount);
    openKeyBoard({ open: false });
  };

  const handleSetAmount = param => {
    if (param.length > 7) {
      setAmount(param.substring(0, 7));
    } else {
      setAmount(param);
    }
  };

  return (
    <React.Fragment>
      {isKeyBoardOpen && (
        <div aria-hidden className={style.mask} onClick={handleKeyBoardBlur} />
      )}
      <div
        className={classNames(style.container, isKeyBoardOpen && style.open)}
      >
        <div className={style.section}>
          <div className={style.input}>{amount === '0' ? '' : amount}</div>
          <div
            aria-hidden
            className={style.backspaceBtn}
            onClick={handleBackSpaceBtnClick}
          />
        </div>
        <div className={style.section}>
          {numbers.map(number => (
            <div
              aria-hidden
              key={number}
              className={style.keys}
              onClick={handleNumberBtnClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <div className={style.section}>
          {hotkey.map(number => (
            <div
              aria-hidden
              key={number}
              className={style.keys}
              onClick={handleNumberBtnClick(number)}
            >
              {number}
            </div>
          ))}
          <div
            aria-hidden
            className={style.clearBtn}
            onClick={handleClearBtnClick}
          />
          <div
            aria-hidden
            className={style.downBtn}
            onClick={handleDownBtnClick}
          >
            DONE
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

KeyBord.propTypes = {
  isKeyBoardDecimal: PropTypes.bool.isRequired,
  isKeyBoardOpen: PropTypes.bool.isRequired,
  openKeyBoard: PropTypes.func.isRequired,
  keyBoardHandleFunc: PropTypes.func.isRequired,
};

export default KeyBord;
