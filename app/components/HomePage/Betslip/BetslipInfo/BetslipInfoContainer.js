import { connect } from 'react-redux';
import { requestDoBet } from 'reducers/betslip';
import Component from './BetslipInfo';

const mapStateToProps = state => ({
  betType: state.betslip.betType,
  betCount: state.betslip.keys.length,
  priceChangeHandleType: state.betslip.priceChangeHandleType,
  priceNeverChange: state.betslip.priceNeverChange,
});

const mapDispatchToProps = dispatch => ({
  requestDoBet: () => dispatch(requestDoBet()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
