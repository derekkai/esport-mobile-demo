import { call, takeEvery, select, put } from 'redux-saga/effects';
import { data as upcomingGameData } from 'data/upcomingGame';
import { data as recommendGameData } from 'data/recommandGame';
import { data as resultGameData } from 'data/resultGame';
import { data as resultMarketData} from 'data/resultMarket';
import { data as upcomingMarketData } from 'data/upcomingMarket';
import { data as marketGameInfoData } from 'data/marketGameInfo';
import { isEmpty } from 'lodash';
import history from 'utils/history';
import { REQUEST_LIVE_DATA, setLiveData, updateLiveData } from 'reducers/live';
import {
  setUpcomingMarketData,
  updateUpcomingMarketData,
} from 'reducers/upcomingMarket';
import { setResultMarketData } from 'reducers/resultMarket';
import {
  setUpcomingGameData,
  updateUpcomingGameData,
  REQUEST_UPCOMING_GAME_DATA,
} from 'reducers/upcomingGame';
import {
  setChampionGameData,
  updateChampionGameData,
  REQUEST_CHAMPION_GAME_DATA,
} from 'reducers/championGame';
import {
  setResultGameData,
  REQUEST_RESULT_GAME_DATA,
} from 'reducers/resultGame';
import {
  setRecommandGameData,
  REQUEST_RECOMMAND_GAME_DATA,
  updateRecommandGameData,
} from 'reducers/recommandGame';
import { getNewsData } from 'helpers/api';
import {
  REQUEST_MARKET_GAMEINFO,
  setMarketGameInfo,
  setLoadingStatus,
  REQUEST_MARKET_LIST_DATA,
  updateMarketGameInfo,
} from 'reducers/global';
import settings from 'settings';
import { REQUEST_NEWS_DATA, setNewsData } from 'reducers/news';
import { toSecondTimesStamp } from 'helpers/common';
import { addReceiver, unsubscribeHandler } from 'sagas/websocket';
import {
  selectGameListType,
  selectClassifierEntity,
  selectMarketGameId,
  selectUpcomingDateRangeTimestamp,
  selectClassifierSportSelect,
  selectClassifierCompetitionSelect,
  selectChampionDateRangeTimestamp,
  selectResultDateRangeTimestamp,
  selectResultGameKeys,
} from 'sagas/selectors';
import {
  getGameData,
  getMarketData,
  getResultGameData,
  getResultMarketData,
  getMarketGameInfo,
  getResultMarketGameInfo,
  getLiveData,
  getChampionData,
  getRecommandGame,
} from '../helpers/commandSender';

function* requestMarketListData() {
  // const rid = `${Date.now()}@Market`;
  const type = yield select(selectGameListType);
  // const gameId = yield select(selectMarketGameId);
  // yield put(setLoadingStatus({ name: 'market', value: true }));
  switch (type) {
    case 'upcoming': {
      yield put(setUpcomingMarketData(upcomingMarketData.data));
      yield put(setLoadingStatus({ name: 'market', value: false }));
      // addReceiver(
      //   rid,
      //   setUpcomingMarketData,
      //   { subscribeName: 'upcomingMarket' },
      //   updateUpcomingMarketData,
      //   [setLoadingStatus({ name: 'market', value: false })],
      // );
      // yield call(getMarketData, rid, Number(gameId));
      break;
    }
    case 'result': {
      yield put(setResultMarketData(resultMarketData.data));
      yield put(setLoadingStatus({ name: 'market', value: false }));
      // addReceiver(rid, setResultMarketData, null, null, [
      //   setLoadingStatus({ name: 'market', value: false }),
      // ]);
      // yield call(getResultMarketData, rid, Number(gameId));
      break;
    }
    default:
      break;
  }
}

function* requestMarketGameInfo() {
  yield put(setMarketGameInfo(marketGameInfoData.data));
  yield put(setLoadingStatus({ name: 'marketGameInfo', value: false }));
  //
  // const paths = history.location.pathname.split('/');
  // const gameId = Number(paths[3]);
  // const type = yield select(selectGameListType);
  // yield put(setLoadingStatus({ name: 'marketGameInfo', value: true }));
  // const rid = `${Date.now()}@singleGameInfo`;
  // addReceiver(
  //   rid,
  //   setMarketGameInfo,
  //   { subscribeName: 'marketGameInfo' },
  //   updateMarketGameInfo,
  //   [setLoadingStatus({ name: 'marketGameInfo', value: false })],
  // );
  // switch (type) {
  //   case 'upcoming':
  //     yield call(getMarketGameInfo, rid, gameId);
  //     break;
  //   case 'result':
  //     yield call(getResultMarketGameInfo, rid, gameId);
  //     break;
  //   default:
  //     break;
  // }
}

function* requestNewsDataData() {
  try {
    yield put(setLoadingStatus({ name: 'news', value: true }));
    const result = yield call(getNewsData);
    yield put(setLoadingStatus({ name: 'news', value: false }));
    const { IsSuccess, Data } = result;
    if (IsSuccess) {
      yield put(setNewsData(Data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* requestLiveData() {
  // try {
  //   const rid = `${Date.now()}@live`;
  //   addReceiver(rid, setLiveData, { subscribeName: 'live' }, updateLiveData);
  //   yield call(getLiveData, rid);
  // } catch (e) {
  //   console.error(e);
  // }
}

function* requestRecommandGameData() {
  yield put(setRecommandGameData(recommendGameData.data));
  yield put(setLoadingStatus({ name: 'recommand', value: false }));
  // try {
  //   const rid = `${Date.now()}@recommand`;
  //   yield put(setLoadingStatus({ name: 'recommand', value: true }));
  //   addReceiver(
  //     rid,
  //     setRecommandGameData,
  //     { subscribeName: 'recommand' },
  //     updateRecommandGameData,
  //     yield put(setLoadingStatus({ name: 'recommand', value: false })),
  //   );
  //   yield call(getRecommandGame, rid);
  // } catch (e) {
  //   console.error(e);
  // }
}

export default function* watchers() {
  yield takeEvery(REQUEST_RECOMMAND_GAME_DATA, requestRecommandGameData);
  yield takeEvery(REQUEST_MARKET_GAMEINFO, requestMarketGameInfo);
  yield takeEvery(REQUEST_MARKET_LIST_DATA, requestMarketListData);
  yield takeEvery(REQUEST_LIVE_DATA, requestLiveData);
  yield takeEvery(REQUEST_NEWS_DATA, requestNewsDataData);
  yield takeEvery(REQUEST_UPCOMING_GAME_DATA, requestUpcomingGameData);
  yield takeEvery(REQUEST_CHAMPION_GAME_DATA, requestChampionGameData);
  yield takeEvery(REQUEST_RESULT_GAME_DATA, requestResultGameData);
}

export function* requestUpcomingGameData() {
  yield put(setUpcomingGameData(upcomingGameData.data));
  yield put(setLoadingStatus({ name: 'upcomingGame', value: false }));
  // try {
  //   yield call(unsubscribeHandler, 'upcomingGame');
  //   const rid = `${Date.now()}@upcomingGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectUpcomingDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //
  //   addReceiver(
  //     rid,
  //     setUpcomingGameData,
  //     { subscribeName: 'upcomingGame' },
  //     updateUpcomingGameData,
  //     [setLoadingStatus({ name: 'upcomingGame', value: false })],
  //   );
  //   yield call(getGameData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestChampionGameData() {
  // yield put(setLoadingStatus({ name: 'championGame', value: true }));
  // try {
  //   yield call(unsubscribeHandler, 'championGame');
  //   const rid = `${Date.now()}@championGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectChampionDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //
  //   addReceiver(
  //     rid,
  //     setChampionGameData,
  //     { subscribeName: 'championGame' },
  //     updateChampionGameData,
  //     [setLoadingStatus({ name: 'championGame', value: false })],
  //   );
  //   yield call(getChampionData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

export function* requestResultGameData() {
  yield put(setResultGameData(resultGameData.data));
  yield put(setLoadingStatus({ name: 'resultGame', value: false }));
  // yield put(setLoadingStatus({ name: 'resultGame', value: true }));
  // try {
  //   const rid = `${Date.now()}@resultGame`;
  //
  //   const { sportId, competitionId } = yield call(createfilterData);
  //   const dateRange = yield select(selectResultDateRangeTimestamp);
  //   const begin = toSecondTimesStamp(dateRange.from);
  //   const end = toSecondTimesStamp(dateRange.to);
  //   const keys = yield select(selectResultGameKeys);
  //
  //   addReceiver(rid, setResultGameData, null, null, [
  //     setLoadingStatus({ name: 'resultGame', value: false }),
  //   ]);
  //   yield call(getResultGameData, {
  //     rid,
  //     sportId,
  //     competitionId,
  //     skip: keys.length,
  //     begin,
  //     end,
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
}

function* createfilterData() {
  let sportId;
  let competitionId;
  try {
    const sportSelect = yield select(selectClassifierSportSelect);
    const competitionSelect = yield select(selectClassifierCompetitionSelect);
    const entity = yield select(selectClassifierEntity);

    if (sportSelect === 0) {
      // 所有遊戲
      sportId = [...settings.sportIds];
    } else {
      // sport id
      competitionId = [];
      sportId = [];
      if (
        sportSelect !== 0 &&
        !competitionSelect[sportSelect] &&
        entity[sportSelect]
      ) {
        Object.values(entity[sportSelect].competition).forEach(el => {
          competitionId.push(el.id);
        });
        sportId.push(sportSelect);
      }

      // competition id
      if (!isEmpty(competitionSelect)) {
        Object.entries(competitionSelect).forEach(([key, value]) => {
          sportId.push(Number(key));
          competitionId = [...competitionId, ...value];
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
  return {
    sportId,
    competitionId,
  };
}
