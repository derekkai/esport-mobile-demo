import { connect } from 'react-redux';
import Component from './GameItem';
import { makeMarket } from './selectors';

const makeMapStateToProps = () => {
  const getMarket = makeMarket();
  const mapStateToProps = (state, props) => {
    try {
      const gameInfo = state.upcomingGame.entity[props.gameId];
      return {
        haveVideo: state.live.keys.includes(props.gameId),
        market: getMarket(state, props),
        competitionName: gameInfo?.competitionName,
        sportId: gameInfo?.sport?.id,
        team1Name: gameInfo?.team1_name,
        team2Name: gameInfo?.team2_name,
        team1Id: gameInfo?.team1_id,
        team2Id: gameInfo?.team2_id,
        type: gameInfo?.type,
        startTs: gameInfo?.start_ts,
        gameId: gameInfo?.id,
        team1Score: gameInfo?.stats?.team1_value || 0,
        team2Score: gameInfo?.stats?.team2_value || 0,
        marketsCount: gameInfo?.markets_count,
        donateVideo: Boolean(gameInfo?.donate_video),
      };
    } catch (e) {
      console.error(e);
      console.error(props.gameId);
      return {};
    }
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Component);
