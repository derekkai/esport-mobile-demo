import { connect } from 'react-redux';
import { switchClassifier } from 'reducers/classifier';
import Component from './TopBar';

const mapStateToProps = state => ({
  isLogin: state.account.isLogin,
  account: state.account.account,
  balance: state.account.balance,
});

const mapDispatchToProps = dispatch => ({
  switchClassifier: param => dispatch(switchClassifier(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
