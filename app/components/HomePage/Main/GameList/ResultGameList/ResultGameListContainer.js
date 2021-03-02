import { connect } from 'react-redux';
import {
  clearResultGameData,
  requestResultGameData,
} from 'reducers/resultGame';
import { clearLoadDownStatus } from 'reducers/global';
import Component from './ResultGameList';

const mapStateToProps = state => ({
  keys: state.resultGame.keys,
  loading: state.global.loading.resultGame,
});

const mapDispatchToProps = dispatch => ({
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  requestResultGameData: () => dispatch(requestResultGameData()),
  clearResultGameData: () => dispatch(clearResultGameData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
