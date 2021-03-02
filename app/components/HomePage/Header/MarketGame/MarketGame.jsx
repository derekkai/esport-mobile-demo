import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import GameStatusDisplay from 'components/ShareComponent/GameStatusDisplay/GameStatusDisplay';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import MoreInfoButton from 'components/ShareComponent/MoreInfoButton/MoreInfoButton';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './MarketGame.scss';

const images = require.context('../../../../images/backgrounds', true);

const MarketGame = ({
  haveVideo,
  sportId,
  requestMarketGameInfo,
  competitionName,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  type,
  startTs,
  team1Score,
  team2Score,
  clearMarketGameInfo,
  history,
  videoUrl,
}) => {
  const [isVideoOpen, setVideoOpen] = useState(false);

  const handleGoBackBtnClick = () => {
    history.goBack();
  };

  const handleOpenVideo = () => {
    setVideoOpen(true);
  };

  useEffect(() => {
    requestMarketGameInfo();
    return () => {
      clearMarketGameInfo();
    };
  }, []);

  let img_src;

  try {
    img_src = images(`./img_bg_${sportId}.jpg`);
  } catch (e) {
    if (sportId && sportId !== 0) {
      img_src = images(`./img_bg_0.jpg`);
    }
  }

  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${img_src})` }}
    >
      <div className={style.header}>
        <div
          aria-hidden
          className={style.goBackBtn}
          onClick={handleGoBackBtnClick}
        />
        {isVideoOpen ? (
          <div className={style.videoHeader}>
            <div className={style.box}>
              <div className={style.text}>{team1Name}</div>
            </div>
            <div className={style.main}>
              <div
                className={style.text}
              >{`${team1Score} : ${team2Score}`}</div>
            </div>
            <div className={style.box}>
              <div className={style.text}>{team2Name}</div>
            </div>
          </div>
        ) : (
          <>
            <SportIcon
              sportId={sportId}
              className={style.sportIcon}
              type="white"
            />
            <div className={style.text}>{competitionName}</div>
            <MoreInfoButton
              className={style.videoBtn}
              type="video"
              disable={!haveVideo}
              onClick={handleOpenVideo}
            />
          </>
        )}
      </div>
      <div className={style.body}>
        {isVideoOpen ? (
          <iframe
            title="live"
            className={style.video}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            src={videoUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className={style.content}>
            <div className={classNames(style.side, style.left)}>
              <div className={style.iconBg}>
                <TeamIcon teamId={team1Id} teamName={team1Name} size="small" />
              </div>
              <div className={style.box}>
                <div className={style.text}>{team1Name}</div>
              </div>
            </div>
            <div className={style.main}>
              <div className={style.status}>
                <GameStatusDisplay
                  haveVideo={haveVideo}
                  type={type}
                  isDark
                  timestamp={startTs}
                />
              </div>
              <div className={style.score}>
                <div>{team1Score}</div>
                <div className={style.divider}>:</div>
                <div>{team2Score}</div>
              </div>
            </div>
            <div className={classNames(style.side, style.right)}>
              <div className={style.iconBg}>
                <TeamIcon teamId={team2Id} teamName={team2Name} size="small" />
              </div>
              <div className={style.box}>
                <div className={style.text}>{team2Name}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MarketGame.propTypes = {
  haveVideo: PropTypes.bool.isRequired,
  sportId: PropTypes.number.isRequired,
  requestMarketGameInfo: PropTypes.func.isRequired,
  competitionName: PropTypes.string.isRequired,
  team1Name: PropTypes.string.isRequired,
  team2Name: PropTypes.string.isRequired,
  team1Id: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Score: PropTypes.number.isRequired,
  clearMarketGameInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  videoUrl: PropTypes.string,
};

export default withRouter(MarketGame);
