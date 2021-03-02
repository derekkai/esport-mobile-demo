import { connect } from 'react-redux';
import {
  requestUpcomingGameData,
  setUpcomingGameUIState,
  clearUpcomingGameData,
} from 'reducers/upcomingGame';
import { clearLoadDownStatus } from 'reducers/global';
import Component from './UpcomingGameList';

const mapStateToProps = state => ({
  displayItemCount: state.upcomingGame.prevUIState.displayItemCount,
  keys: state.upcomingGame.keys,
  loading: state.global.loading.upcomingGame,
});

const mapDispatchToProps = dispatch => ({
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  clearUpcomingGameData: () => dispatch(clearUpcomingGameData()),
  setUpcomingGameUIState: param => dispatch(setUpcomingGameUIState(param)),
  requestUpcomingGameData: () => dispatch(requestUpcomingGameData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
