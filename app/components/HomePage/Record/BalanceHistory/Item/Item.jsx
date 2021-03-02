import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import settings from 'settings';
import Chip from 'components/ShareComponent/Chip/Chip';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './Item.scss';

const Item = ({ count, total, balance, data, date }) => {
  const [expanded, setExpanded] = useState(false);
  const handleArrowBtnClick = () => {
    setExpanded(prevState => !prevState);
  };
  const isDayGainNegative = total < 0;
  const [year, month, day] = date.split('-');
  return (
    <li className={style.container}>
      <div className={style.header}>
        <div className={style.section}>
          <div className={style.text}>{`${year} ${month}-${day}`}</div>
          <div className={style.text}>
            <T {...dm('Count')} />
            {` : ${count}`}
          </div>
        </div>
        <div className={style.section}>
          <Chip
            className={style.chip}
            size="sm"
            type={isDayGainNegative ? 'Lost' : 'Won'}
            text={`${total.toFixed(settings.balanceDecimalPlaceDisplay)} ¥`}
          />
          <div className={style.text}>
            <T {...dm('Balance')} />
            {` : ${balance.toFixed(settings.balanceDecimalPlaceDisplay)} ¥`}
          </div>
        </div>
        <div className={style.arrowBtn}>
          <Arrow active={expanded} onClick={handleArrowBtnClick} />
        </div>
      </div>
      <div className={style.body}>
        {expanded && (
          <ul>
            {data.map(el => {
              const isBetGainNegative = el.TransAmount < 0;
              const time = el.TransDate.split(' ')[1];
              return (
                <li className={style.item} key={el.TransDate + el.TransBalance}>
                  <div className={style.time}>{time}</div>
                  <div className={style.text}>
                    <T {...dm(el.TransReason)} />
                  </div>
                  <div
                    className={classNames(
                      style.text,
                      isBetGainNegative ? style.negative : style.positive,
                    )}
                  >
                    {`${el.TransAmount.toFixed(
                      settings.balanceDecimalPlaceDisplay,
                    )} ¥`}
                  </div>
                  <div className={style.text}>{`${el.TransBalance.toFixed(
                    settings.balanceDecimalPlaceDisplay,
                  )} ¥`}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

Item.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};
export default Item;
