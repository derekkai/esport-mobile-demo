import { connect } from 'react-redux';
import { updateStake } from 'reducers/betslip';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import { makePrice } from './selectors';
import Component from './MultipleInfo';

const mapStateToProps = state => ({
  price: makePrice(state),
  stake: state.betslip.stake,
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
