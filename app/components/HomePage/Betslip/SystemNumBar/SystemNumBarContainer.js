import { connect } from 'react-redux';
import { setSystemNum, setSystemBetCount } from 'reducers/betslip';
import { makeItems } from './selectors';
import Component from './SystemNumBar';

const mapStateToProps = state => ({
  items: makeItems(state),
  systemNum: state.betslip.systemNum,
  betCount: state.betslip.keys.length,
});

const mapDispatchToProps = dispatch => ({
  setSystemNum: param => dispatch(setSystemNum(param)),
  setSystemBetCount: param => dispatch(setSystemBetCount(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
