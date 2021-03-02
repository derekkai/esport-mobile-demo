import { connect } from 'react-redux';
import { makeInfo } from './selectors';
import Component from './SingleInfo';

const mapStateToProps = state => ({
  ...makeInfo(state),
});

export default connect(mapStateToProps)(Component);
