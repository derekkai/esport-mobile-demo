import { connect } from 'react-redux';
import {
  setBetType,
  clearBetslipData,
  removeBetsKey,
  removeBetEntity,
  requestUpdateBetEventData,
} from 'reducers/betslip';
import Component from './Betslip';

const mapStateToProps = state => ({
  in: state.global.modal === 'betslip',
  active: state.global.modal === 'betslip',
  betCount: Object.keys(state.betslip.entity).length,
  betType: state.betslip.betType,
  keys: state.betslip.keys,
  showResult: state.betslip.showResult,
  isWaitingResponse: state.betslip.isWaitingResponse,
  isSuccess: state.betslip.isSuccess,
  failCode: state.betslip.failCode,
});

const mapDispatchToProps = dispatch => ({
  removeBetEntity: param => dispatch(removeBetEntity(param)),
  removeBetsKey: param => dispatch(removeBetsKey(param)),
  setBetType: param => dispatch(setBetType(param)),
  clearBetslipData: () => dispatch(clearBetslipData()),
  requestUpdateBetEventData: () => dispatch(requestUpdateBetEventData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
