import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/ShareComponent/Checkbox/Checkbox';
import style from './CompetitionItem.scss';

const CompetitionItem = ({
  data,
  isSelect,
  setClassifierCompetitionSelect,
  sportId,
  competitionId,
}) => {
  const handleItemClick = () => {
    setClassifierCompetitionSelect({
      sportId,
      competitionId,
    });
  };
  return (
    <li className={style.container} onClick={handleItemClick} aria-hidden>
      <Checkbox isSelect={isSelect} />
      <div className={style.name}>{data.name}</div>
      <div className={style.count}>{Object.keys(data.game || {}).length}</div>
    </li>
  );
};

CompetitionItem.propTypes = {
  data: PropTypes.object.isRequired,
  isSelect: PropTypes.bool.isRequired,
  setClassifierCompetitionSelect: PropTypes.func.isRequired,
  sportId: PropTypes.number.isRequired,
  competitionId: PropTypes.number.isRequired,
};

export default CompetitionItem;
