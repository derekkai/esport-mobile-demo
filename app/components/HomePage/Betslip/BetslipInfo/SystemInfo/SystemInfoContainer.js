import { connect } from 'react-redux';
import { updateStake } from 'reducers/betslip';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import Component from './SystemInfo';
import { makeInfo } from './selectors';

const mapStateToProps = state => ({
  stake: state.betslip.stake,
  ...makeInfo(state),
});

const mapDispatchToProps = dispatch => ({
  updateStake: param => dispatch(updateStake(param)),
  setKeyBoardHandleFunc: param => dispatch(setKeyBoardHandleFunc(param)),
  openKeyBoard: param => dispatch(openKeyBoard(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
