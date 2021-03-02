import { connect } from 'react-redux';
import { colorLog } from 'helpers/common';
import history from 'utils/history';
import { requestMarketGameInfo, clearMarketGameInfo } from 'reducers/global';
import Component from './MarketGame';

const mapStateToProps = state => {
  if (state.global.marketPageError) {
    const { pathname } = state.router.location;
    if (pathname.includes('market')) {
      colorLog('Push to root', 'warn');
      if (pathname.includes('result')) {
        history.replace({ pathname: '/result' });
      } else {
        history.push('');
      }
    }
  }
  const gameId = state.global.marketGameInfo.id;
  return {
    gameId,
    haveVideo: state.live.keys.includes(state.global.marketGameInfo.id),
    sportId: state.global.marketGameInfo.sport.id,
    competitionName: state.global.marketGameInfo.competitionName,
    team1Name: state.global.marketGameInfo.team1_name,
    team2Name: state.global.marketGameInfo.team2_name,
    team1Id: state.global.marketGameInfo.team1_id,
    team2Id: state.global.marketGameInfo.team2_id,
    type: state.global.marketGameInfo.type,
    startTs: state.global.marketGameInfo.start_ts,
    team1Score: state.global.marketGameInfo.stats?.team1_value || 0,
    team2Score: state.global.marketGameInfo.stats?.team2_value || 0,
    gameListType: state.global.gameListType,
    mainDataType: state.global.mainDataType,
    videoUrl: state.live.entity[gameId]?.video_url,
  };
};

const mapDispatchToProps = dispatch => ({
  requestMarketGameInfo: () => dispatch(requestMarketGameInfo()),
  clearMarketGameInfo: () => dispatch(clearMarketGameInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
