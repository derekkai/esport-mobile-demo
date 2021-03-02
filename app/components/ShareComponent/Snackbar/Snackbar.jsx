import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withCSSTransition } from 'HOCs/hocs';
import { FormattedMessage as T } from 'react-intl';
import settings from 'settings';
import { dm } from 'helpers/language';
import style from './Snackbar.scss';

const Snackbar = ({ type, setAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      setAlert({ type, value: false });
    }, settings.alertMessageKeepTime);
  }, []);

  return (
    <div className={style.container}>
      <svg className={style.icon} focusable="false" viewBox="0 0 24 24">
        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
      </svg>
      <div className={style.text}>
        <T {...dm(settings.alertsContent[type])} />
      </div>
    </div>
  );
};

Snackbar.propTypes = {
  type: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default withCSSTransition(Snackbar, 'snackbar');
