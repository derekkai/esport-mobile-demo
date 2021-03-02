import { connect } from 'react-redux';
import { setMarketGameInfoSportId } from 'reducers/global';
import Component from './MoreInfoButton';

const mapDispatchToProps = dispatch => ({
  setMarketGameInfoSportId: param => dispatch(setMarketGameInfoSportId(param)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
