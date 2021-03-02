import { connect } from 'react-redux';
import Component from './TopGames';

const mapStateToProps = state => ({
  keys: state.recommandGame.keys,
});

export default connect(mapStateToProps)(Component);
