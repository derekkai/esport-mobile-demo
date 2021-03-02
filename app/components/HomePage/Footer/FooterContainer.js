import { connect } from 'react-redux';
import { resetClassifierSelection } from 'reducers/classifier';
import Component from './Footer';

const mapStateToProps = state => ({
  gameListType: state.global.gameListType,
  isLogin: state.account.isLogin,
});

const mapDispatchToProps = dispatch => ({
  resetClassifierSelection: () => dispatch(resetClassifierSelection()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
