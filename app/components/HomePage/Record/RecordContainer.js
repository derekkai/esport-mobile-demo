import { connect } from 'react-redux';
import Component from './Record';

const mapStateToProps = state => ({
  in: state.global.modal === 'record',
});

export default connect(mapStateToProps)(Component);
