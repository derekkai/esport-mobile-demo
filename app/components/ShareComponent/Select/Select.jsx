import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Select.scss';

const Select = ({
  className,
  children,
  value,
  onChange,
  disabled,
  onFocus,
  onBlur,
  type,
}) => {
  return (
    <div className={style.container}>
      <select
        data-type={type}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={classNames(style.select, className)}
      >
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Select;
