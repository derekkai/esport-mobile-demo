import { connect } from 'react-redux';
import { switchClassifier } from 'reducers/classifier';
import Component from './Classifier';

const mapStateToProps = state => ({
  data: state.classifier.entity,
  in: state.classifier.moveOut,
  isLoading: state.global.loading.classifier,
  unmountOnExit: false,
  moveOut: state.classifier.moveOut,
});

const mapDispatchToProps = dispatch => ({
  switchClassifier: param => dispatch(switchClassifier(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
