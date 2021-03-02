import { connect } from 'react-redux';
import { setClassifierSportSelect } from 'reducers/classifier';
import { makeAllCount } from './selectors';
import Component from '../SportItem/SportItem';

const mapStateToProps = state => ({
  sportCount: makeAllCount(state),
  active: state.classifier.sportSelect === 0,
  pathname: state.router.location.pathname,
  gameListType: state.global.gameListType,
  mainDataType: state.global.mainDataType,
});

const mapDispatchToProps = dispatch => ({
  setClassifierSportSelect: param => dispatch(setClassifierSportSelect(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
