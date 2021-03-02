import { connect } from 'react-redux';
import {
  requestBetHistory,
  setBetHistoryDateRange,
  resetBetHistoryDateRange,
  setBetHistoryFilterBetType,
} from 'reducers/betHistory';
import Component from './BetHistory';
import { makeFilterEntity } from './selectors';

const mapStateToProps = state => ({
  dateRangeDays: state.betHistory.dateRangeDays,
  entity: makeFilterEntity(state),
  filterBetType: state.betHistory.filterBetType,
  isLoading: state.global.loading.betHistory,
});

/*eslint-disable prettier/prettier*/
const mapDispatchToProps = dispatch => ({
  requestBetHistory: () => dispatch(requestBetHistory()),
  setBetHistoryDateRange: param => dispatch(setBetHistoryDateRange(param)),
  resetBetHistoryDateRange: () => dispatch(resetBetHistoryDateRange()),
  setBetHistoryFilterBetType: param => dispatch(setBetHistoryFilterBetType(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
