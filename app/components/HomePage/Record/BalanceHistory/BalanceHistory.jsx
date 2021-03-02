import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'settings';
import Select from 'components/ShareComponent/Select/Select';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import ItemContainer from './Item/ItemContainer';
import style from './BalanceHistory.scss';

const BalanceHistory = ({
  dateRangeDays,
  keys,
  requestBalanceHistory,
  setBalanceHistoryDateRange,
  isLoading,
  resetBalanceHistoryDateRange,
}) => {
  useEffect(() => {
    requestBalanceHistory();
    return () => {
      resetBalanceHistoryDateRange();
    };
  }, []);

  const handleDayFilterSelectChange = e => {
    setBalanceHistoryDateRange({ type: 'days', value: e.target.value });
  };

  const renderContent = () => {
    if (keys.length === 0 && !isLoading) {
      return <EmptyIcon type="balanceHistory" className={style.emptyIcon} />;
    }
    return (
      <ul className={style.list}>
        {keys.map(date => (
          <ItemContainer key={date} date={date} />
        ))}
      </ul>
    );
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.selectContainer}>
          <Select
            className={style.filterSelect}
            value={dateRangeDays}
            onChange={handleDayFilterSelectChange}
          >
            {settings.dayRangeFilterItems
              .filter(
                item =>
                  !settings.balanceHistoryMAXDays ||
                  item.value <= settings.balanceHistoryMAXDays,
              )
              .map(item => (
                <T key={item.value} {...dm(item.label)} values={item.label}>
                  {message => <option value={item.value}>{message}</option>}
                </T>
              ))}
          </Select>
        </div>
      </div>
      <div className={style.body}>{renderContent()}</div>
    </div>
  );
};

BalanceHistory.propTypes = {
  dateRangeDays: PropTypes.number.isRequired,
  keys: PropTypes.array.isRequired,
  requestBalanceHistory: PropTypes.func.isRequired,
  setBalanceHistoryDateRange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetBalanceHistoryDateRange: PropTypes.func.isRequired,
};

export default BalanceHistory;
