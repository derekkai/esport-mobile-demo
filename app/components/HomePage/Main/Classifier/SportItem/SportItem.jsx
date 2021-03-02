import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { gameListTabs } from 'settings';
import { FormattedMessage as T } from 'react-intl';
import classNames from 'classnames';
import { dm } from 'helpers/language';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import style from './SportItem.scss';
import CompetitionItemContainer from './CompetitionItem/CompetitionItemContainer';

const SportItem = ({
  name,
  competitionData = {},
  sportCount,
  sportId,
  active,
  mainDataType,
  gameListType,
  selectAllCompetition,
  clearAllCompetition,
  setClassifierSportSelect,
  history,
}) => {
  const handleItemClick = () => {
    if (!active) {
      setClassifierSportSelect(sportId);
    } else if (mainDataType !== 'game') {
      history.push(`/${gameListTabs[gameListType].value}`);
    }
  };

  const handleSeletAllClick = () => {
    selectAllCompetition(sportId);
  };

  const handleClearClick = () => {
    clearAllCompetition(sportId);
  };

  return (
    <li
      className={classNames(
        style.container,
        active && style.active,
        active && style.extend,
      )}
    >
      <div aria-hidden className={style.item} onClick={handleItemClick}>
        <SportIcon className={style.sportIcon} type="color" sportId={sportId} />
        <div className={style.name}>
          <T {...dm(name)} />
        </div>
        <div className={style.sportCount}>+{sportCount}</div>
      </div>
      {sportId !== 0 && (
        <div className={classNames(style.menuWrapper)}>
          <div className={classNames(style.menu, active && style.fadeOut)}>
            <div className={style.header}>
              <div aria-hidden onClick={handleSeletAllClick}>
                <T {...dm('Select all')} />
              </div>
              <div aria-hidden onClick={handleClearClick}>
                <T {...dm('Clear')} />
              </div>
            </div>
            <div className={style.body}>
              <ul>
                {Object.values(competitionData).map(data => (
                  <CompetitionItemContainer
                    sportId={sportId}
                    key={data.id}
                    data={data}
                    competitionId={data.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

SportItem.propTypes = {
  name: PropTypes.string.isRequired,
  competitionData: PropTypes.object,
  sportCount: PropTypes.number.isRequired,
  sportId: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  mainDataType: PropTypes.string.isRequired,
  gameListType: PropTypes.string.isRequired,
  selectAllCompetition: PropTypes.func.isRequired,
  clearAllCompetition: PropTypes.func.isRequired,
  setClassifierSportSelect: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SportItem);
