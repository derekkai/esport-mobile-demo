import { connect } from 'react-redux';
import { setClassifierCompetitionSelect } from 'reducers/classifier';
import Component from './CompetitionItem';

const mapStateToProps = (state, props) => {
  const competitionSelect =
    state.classifier.competitionSelect[props.sportId] || [];
  return {
    isSelect: competitionSelect.includes(props.competitionId),
  };
};

const mapDispatchToProps = dispatch => ({
  setClassifierCompetitionSelect: param =>
    dispatch(setClassifierCompetitionSelect(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
