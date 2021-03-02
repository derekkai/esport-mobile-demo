import { connect } from 'react-redux';
import Component from './BetList';

const mapStateToProps = state => ({
  keys: state.betslip.keys,
});

export default connect(mapStateToProps)(Component);
