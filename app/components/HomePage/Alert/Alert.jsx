import React from 'react';
import PropTypes from 'prop-types';
import SnackbarContainer from 'components/ShareComponent/Snackbar/SnackbarContainer';
import { TransitionGroup } from 'react-transition-group';
import style from './Alert.scss';

const Alert = ({ alerts }) => {
  return (
    <div className={style.container}>
      <TransitionGroup>
        {alerts.map(alertType => (
          <SnackbarContainer type={alertType} />
        ))}
      </TransitionGroup>
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default Alert;
