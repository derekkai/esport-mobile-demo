import { connect } from 'react-redux';
import {
  updateSingleStake,
  removeBet,
  removeBetEntity,
  setPriceNeverChange,
} from 'reducers/betslip';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import Component from './BetCard';

const mapStateToProps = (state, props) => ({
  ...state.betslip.entity[props.eventId],
  betType: state.betslip.betType,
});

const mapDispatchToProps = dispatch => ({
  updateSingleStake: param => dispatch(updateSingleStake(param)),
  removeBet: param => dispatch(removeBet(param)),
  removeBetEntity: param => dispatch(removeBetEntity(param)),
  setKeyBoardHandleFunc: param => dispatch(setKeyBoardHandleFunc(param)),
  openKeyBoard: param => dispatch(openKeyBoard(param)),
  setPriceNeverChange: param => dispatch(setPriceNeverChange(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
