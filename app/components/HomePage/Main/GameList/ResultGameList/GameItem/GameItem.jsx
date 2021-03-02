import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import settings from 'settings';
import { withCSSTransition } from 'HOCs/hocs';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { timeConvert } from 'helpers/common';
import MoreInfoButtonContainer from 'components/ShareComponent/MoreInfoButton/MoreInfoButtonContainer';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import Card from 'components/ShareComponent/Card/Card';
import Chip from 'components/ShareComponent/Chip/Chip';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './GameItem.scss';

const GameItem = ({
  sportId,
  competitionName,
  marketsCount,
  gameId,
  team1Id,
  team1Name,
  team1Score,
  team2Id,
  team2Name,
  team2Score,
  matchStatus,
  startTs,
}) => {
  const { hours, day, minute, month } = timeConvert(startTs);
  const time = `${month}/${day} ${hours}:${minute}`;
  let winFlag = 0; // 0. hide, 1. left, 2. right 3. draw 4. live

  switch (matchStatus) {
    case settings.MatchStatus.Started:
      winFlag = 4;
      break;
    case settings.MatchStatus.Completed: {
      if (Number(team1Score) > Number(team2Score)) {
        winFlag = 1;
      } else if (Number(team1Score) < Number(team2Score)) {
        winFlag = 2;
      } else {
        winFlag = 3;
      }
      break;
    }
    case settings.MatchStatus.Canceled:
      winFlag = 5;
      break;
    default:
      break;
  }

  const renderLeftTag = value => {
    switch (value) {
      case 1:
        return <Chip className={style.chip} size="md" type="Won" />;
      case 2:
        return <Chip className={style.chip} size="md" type="Lost" />;
      default:
        return undefined;
    }
  };

  const renderRightTag = value => {
    switch (value) {
      case 2:
        return <Chip className={style.chip} size="md" type="Won" />;
      case 1:
        return <Chip className={style.chip} size="md" type="Lost" />;
      default:
        return undefined;
    }
  };

  const renderMiddleTag = value => {
    switch (value) {
      case 3:
        return <Chip className={style.chip} size="md" type="Draw" />;
      case 4:
        return <Chip className={style.chip} size="md" type="Live" />;
      case 5:
        return <Chip className={style.chip} size="md" type="CXL" />;
      default:
        return undefined;
    }
  };

  return (
    <li className={style.wrapper}>
      <Card>
        <Card.Header className={style.cardHeader}>
          <SportIcon
            className={style.sportIcon}
            sportId={sportId}
            type="deep_blue"
          />
          <div className={style.text}>{competitionName}</div>
          <MoreInfoButtonContainer
            className={style.more}
            light={false}
            type="market"
            dataType="result"
            disable={marketsCount === 0}
            gameId={gameId}
            sportId={sportId}
          />
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <div className={style.side}>
            <div className={style.content}>
              <TeamIcon teamId={team1Id} teamName={team1Name} size="small" />
              <div className={style.box}>
                <div className={style.text}>{team1Name}</div>
              </div>
            </div>
            <div className={style.section}>{renderLeftTag(winFlag)}</div>
          </div>
          <div className={style.main}>
            <div className={style.status}>
              <T {...dm(time)} />
            </div>
            <div className={style.score}>
              <div className={classNames(style.text, style.left)}>
                {team1Score}
              </div>
              <div className={style.divider}>:</div>
              <div className={classNames(style.text, style.right)}>
                {team2Score}
              </div>
            </div>
            <div className={style.section}>{renderMiddleTag(winFlag)}</div>
          </div>
          <div className={classNames(style.side, style.right)}>
            <div className={style.content}>
              <TeamIcon teamId={team2Id} teamName={team2Name} size="small" />
              <div className={style.box}>
                <div className={style.text}>{team2Name}</div>
              </div>
            </div>
            <div className={style.section}>{renderRightTag(winFlag)}</div>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
};

GameItem.propTypes = {
  sportId: PropTypes.number.isRequired,
  competitionName: PropTypes.string.isRequired,
  marketsCount: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  team1Id: PropTypes.number.isRequired,
  team1Name: PropTypes.string.isRequired,
  team1Score: PropTypes.number.isRequired,
  team2Id: PropTypes.number.isRequired,
  team2Name: PropTypes.string.isRequired,
  team2Score: PropTypes.number.isRequired,
  matchStatus: PropTypes.number.isRequired,
  startTs: PropTypes.number.isRequired,
};

export default withCSSTransition(GameItem, 'game-item');
