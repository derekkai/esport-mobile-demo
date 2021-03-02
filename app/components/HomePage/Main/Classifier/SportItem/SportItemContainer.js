import { connect } from 'react-redux';
import {
  setClassifierSportSelect,
  selectAllCompetition,
  clearAllCompetition,
} from 'reducers/classifier';
import { makeSportCount, makeActive } from './selectors';
import Component from './SportItem';

const makeMapStateToProps = () => {
  const getSportCount = makeSportCount();
  const getActive = makeActive();

  const mapStateToProps = (state, props) => {
    return {
      sportCount: getSportCount(state, props),
      active: getActive(state, props),
      mainDataType: state.global.mainDataType,
      gameListType: state.global.gameListType,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  setClassifierSportSelect: param => dispatch(setClassifierSportSelect(param)),
  selectAllCompetition: param => dispatch(selectAllCompetition(param)),
  clearAllCompetition: param => dispatch(clearAllCompetition(param)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Component);
