import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import lockIcon from 'images/elements/icon_expandgame_nobet.png';
import soccerIcon from 'images/elements/icon_betlist_noslip.png';
import walletIcon from 'images/elements/icon_wallet_empty.png';
import newsIcon from 'images/elements/icon_news_nonews.png';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './EmptyIcon.scss';

const EmptyIcon = ({ className, type }) => {
  const data = {
    game: {
      icon: lockIcon,
      text: 'There are currently no related events.',
    },
    market: {
      icon: lockIcon,
      text: 'There are currently no betting items.',
    },
    betslip: {
      icon: soccerIcon,
      text: 'There are currently no betting items.',
    },
    balanceHistory: {
      icon: walletIcon,
      text: 'There is currently no wallet history.',
    },
    betHistory: {
      icon: soccerIcon,
      text: 'There is currently no betting record.',
    },
    news: {
      icon: newsIcon,
      text: 'There is currently no latest news.',
    },
  };

  return (
    <div className={classNames(style.container, className)}>
      <img src={data[type].icon} alt="" />
      <div className={style.text}>
        <T {...dm(data[type].text)} />
      </div>
    </div>
  );
};

EmptyIcon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default EmptyIcon;
