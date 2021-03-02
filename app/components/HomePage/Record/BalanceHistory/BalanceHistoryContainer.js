import { connect } from 'react-redux';
import {
  requestBalanceHistory,
  setBalanceHistoryDateRange,
  resetBalanceHistoryDateRange,
} from 'reducers/balanceHistory';
import Component from './BalanceHistory';

const mapStateToProps = state => ({
  dateRangeDays: state.balanceHistory.dateRangeDays,
  keys: state.balanceHistory.keys,
  isLoading: state.global.loading.balanceHistory,
});

/*eslint-disable prettier/prettier*/
const mapDispatchToProps = dispatch => ({
  requestBalanceHistory: () => dispatch(requestBalanceHistory()),
  setBalanceHistoryDateRange: param => dispatch(setBalanceHistoryDateRange(param)),
  resetBalanceHistoryDateRange: () => dispatch(resetBalanceHistoryDateRange()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
