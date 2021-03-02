import { connect } from 'react-redux';
import Component from './News';

const mapStateToProps = state => ({
  entity: state.news.entity,
});

export default connect(mapStateToProps)(Component);
