import { connect } from 'react-redux';
import { openKeyBoard } from 'reducers/global';
import Component from './KeyBoard';

const mapStateToProps = state => ({
  isKeyBoardDecimal: state.global.isKeyBoardDecimal,
  isKeyBoardOpen: state.global.isKeyBoardOpen,
  keyBoardHandleFunc: state.global.keyBoardHandleFunc,
});

const mapDispatchToProps = dispatch => ({
  openKeyBoard: param => dispatch(openKeyBoard(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
