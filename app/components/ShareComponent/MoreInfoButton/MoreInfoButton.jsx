import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './MoreInfoButton.scss';

const MoreInfoButton = ({
  className,
  light = true,
  setMarketGameInfoSportId,
  sportId,
  type,
  disable,
  gameId,
  dataType = 'upcoming',
  onClick,
}) => {
  const handleMarketPageBtnClick = () => {
    setMarketGameInfoSportId(sportId);
  };

  switch (type) {
    case 'video': {
      if (disable) return null;
      return (
        <div
          aria-hidden
          onClick={onClick}
          className={classNames(
            className,
            style.container,
            light && style.light,
          )}
        >
          <div className={style.videoIcon} />
          <div className={style.text}>
            <T {...dm('Video')} />
          </div>
        </div>
      );
    }
    case 'market': {
      if (disable) return null;
      return (
        <NavLink
          to={disable ? '' : `/${dataType}/market/${gameId}`}
          className={classNames(
            className,
            style.container,
            light && style.light,
          )}
          onClick={handleMarketPageBtnClick}
        >
          <div className={style.moreIcon} />
          <div className={style.text}>
            <T {...dm('More')} />
          </div>
        </NavLink>
      );
    }
    default:
      return null;
  }
};

MoreInfoButton.propTypes = {
  setMarketGameInfoSportId: PropTypes.func,
  sportId: PropTypes.number,
  type: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  gameId: PropTypes.number,
  switchTheater: PropTypes.func,
  dataType: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  light: PropTypes.bool,
};

export default MoreInfoButton;
