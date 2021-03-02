import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './SystemNumBar.scss';

const SystemNumBar = ({
  items,
  systemNum,
  setSystemNum,
  setSystemBetCount,
  betCount,
}) => {
  const activeIndex = items.find(item => item.value === systemNum);
  const handleNumItemClick = value => () => {
    setSystemNum(value);
  };

  useEffect(() => {
    if (systemNum > betCount - 1) {
      setSystemNum(items[items.length - 1].value);
    } else {
      setSystemBetCount(activeIndex.systemBetCount);
    }
  }, [systemNum, betCount]);

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {items.map(el => (
          <li
            aria-hidden
            key={el.value}
            onClick={handleNumItemClick(el.value)}
            className={classNames(
              style.item,
              activeIndex?.value === el.value && style.active,
            )}
          >
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

SystemNumBar.propTypes = {
  items: PropTypes.array.isRequired,
  systemNum: PropTypes.number.isRequired,
  setSystemNum: PropTypes.func.isRequired,
  setSystemBetCount: PropTypes.func.isRequired,
  betCount: PropTypes.number.isRequired,
};

export default SystemNumBar;
