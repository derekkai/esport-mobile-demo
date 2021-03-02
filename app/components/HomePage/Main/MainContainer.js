import { connect } from 'react-redux';
import { requestClassifierData } from 'reducers/classifier';
import Component from './Main';

const mapStateToProps = state => ({
  moveOut: state.classifier.moveOut,
  gameListType: state.global.gameListType,
});

const mapDispatchToProps = dispatch => ({
  requestClassifierData: () => dispatch(requestClassifierData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
