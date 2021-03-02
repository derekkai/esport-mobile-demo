import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import Select from 'components/ShareComponent/Select/Select';
import settings from 'settings';
import EmptyIcon from 'components/ShareComponent/EmptyIcon/EmptyIcon';
import Item from './Item/Item';
import style from './BetHistory.scss';

const BetHistory = ({
  entity,
  isLoading,
  dateRangeDays,
  filterBetType,
  setBetHistoryFilterBetType,
  requestBetHistory,
  resetBetHistoryDateRange,
  setBetHistoryDateRange,
}) => {
  const [disableSelect, setDisableSelect] = useState(null);

  const handleBetTypeSelectChange = e => {
    setBetHistoryFilterBetType(e.target.value);
  };

  const handleDayFilterSelectChange = e => {
    setBetHistoryDateRange({ type: 'days', value: e.target.value });
  };

  const renderContent = () => {
    if (entity.length === 0 && !isLoading) {
      return <EmptyIcon type="betHistory" className={style.emptyIcon} />;
    }
    return (
      <ul className={style.list}>
        {entity.map(data => (
          <Item key={filterBetType + data.BetID} data={data} />
        ))}
      </ul>
    );
  };

  const handleSelectFocus = e => {
    ({
      day: () => {
        setDisableSelect('betType');
      },
      betType: () => {
        setDisableSelect('day');
      },
    }[e.target.dataset.type]());
  };

  const handleSelectBlur = () => {
    setDisableSelect(null);
  };

  useEffect(() => {
    requestBetHistory();
    return () => {
      resetBetHistoryDateRange();
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.selectContainer}>
          <Select
            type="day"
            onFocus={handleSelectFocus}
            onBlur={handleSelectBlur}
            disabled={disableSelect === 'day'}
            className={style.filterSelect}
            value={dateRangeDays}
            onChange={handleDayFilterSelectChange}
          >
            {settings.dayRangeFilterItems
              .filter(
                item =>
                  !settings.betHistoryMAXDays ||
                  item.value <= settings.balanceHistoryMAXDays,
              )
              .map(item => (
                <T key={item.value} {...dm(item.label)} value={item.label}>
                  {message => <option value={item.value}>{message}</option>}
                </T>
              ))}
          </Select>
        </div>
        <div className={style.selectContainer}>
          <Select
            type="betType"
            onFocus={handleSelectFocus}
            onBlur={handleSelectBlur}
            disabled={disableSelect === 'betType'}
            className={style.filterSelect}
            value={filterBetType}
            onChange={handleBetTypeSelectChange}
          >
            {settings.betHistoryBetTypeItems.map(item => (
              <T key={item.value} {...dm(item.label)} value={item.label}>
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

BetHistory.propTypes = {
  entity: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dateRangeDays: PropTypes.number.isRequired,
  filterBetType: PropTypes.string.isRequired,
  setBetHistoryFilterBetType: PropTypes.func.isRequired,
  requestBetHistory: PropTypes.func.isRequired,
  resetBetHistoryDateRange: PropTypes.func.isRequired,
  setBetHistoryDateRange: PropTypes.func.isRequired,
};

export default BetHistory;
