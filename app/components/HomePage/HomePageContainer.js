import { connect } from 'react-redux';
import {
  setMainDataType,
  setGameListType,
  openModal,
  closeModal,
} from 'reducers/global';
import Component from './HomePage';

const mapStateToProps = state => ({
  modal: state.global.modal,
  mainDataType: state.global.mainDataType,
  gameListType: state.global.gameListType,
  loading: state.global.loading.initalApp,
  offline: state.global.offline,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
  closeModal: () => dispatch(closeModal()),
  setGameListType: param => dispatch(setGameListType(param)),
  setMainDataType: param => dispatch(setMainDataType(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
