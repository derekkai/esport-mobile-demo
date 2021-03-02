import { connect } from 'react-redux';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import Component from './Calculator';

const mapDispatchToProps = dispatch => ({
  openKeyBoard: param => dispatch(openKeyBoard(param)),
  setKeyBoardHandleFunc: param => dispatch(setKeyBoardHandleFunc(param)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
