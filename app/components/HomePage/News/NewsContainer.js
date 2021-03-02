import { connect } from 'react-redux';
import Component from './News';

const mapStateToProps = state => ({
  in: state.global.modal === 'news',
  entity: state.news.entity,
});

export default connect(mapStateToProps)(Component);
