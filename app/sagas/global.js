import { put, call, take, select, fork } from 'redux-saga/effects';
import history from 'utils/history';
import { requestRecommandGameData } from 'reducers/recommandGame';
import { getParameterByName, colorLog } from 'helpers/common';
import { requestLiveData } from 'reducers/live';
import { setLoadingStatus } from 'reducers/global';
import { clearUpcomingGameData } from 'reducers/upcomingGame';
import { clearChampionGameData } from 'reducers/championGame';
import { clearResultGameData } from 'reducers/resultGame';
import Cookie from 'js-cookie';
import { SET_ACCOUNT_DATA } from 'reducers/account';
import { requestUserInfo, requestUserLogin } from 'sagas/account';
import { selectGameListType } from 'sagas/selectors';
import { startNewsPollingTask, startBalancePollingTask } from 'sagas/worker';

// inital app handler.
function* initalApp() {
  colorLog('Inital App...', 'info');
  yield put(setLoadingStatus({ name: 'initalApp', value: true }));
  // yield put({ type: 'INITIALIZE_WEB_SOCKETS_CHANNEL' });
  // yield take('SERVER_CONNECTED');
  // yield call(tryToLogin);
  // colorLog('Try to login.', 'sub_info');
  // yield take(SET_ACCOUNT_DATA);
  // yield fork(startNewsPollingTask);
  // yield fork(startBalancePollingTask);
  yield put(requestRecommandGameData());
  yield put(requestLiveData());
  yield put(setLoadingStatus({ name: 'initalApp', value: false }));
  colorLog('Inital finish!', 'info');
}

function* tryToLogin() {
  let AuthToken = getParameterByName('AuthToken');
  if (AuthToken) {
    const isUseHttps =
      process.env.ENVIRONMENT === 'beta2' ||
      process.env.ENVIRONMENT === 'production';
    Cookie.set('AuthToken', AuthToken, {
      expires: 1,
      sameSite: isUseHttps ? 'none' : undefined,
      secure: isUseHttps,
    });
    history.push('');
  } else {
    AuthToken = Cookie.get('AuthToken');
  }
  if (AuthToken) {
    yield call(requestUserInfo, AuthToken);
  }
  yield call(requestUserLogin, AuthToken);
}

/**
 * 清除 gamelist 的資料
 */
export function* handleClearGameListData() {
  const gameListType = yield select(selectGameListType);
  switch (gameListType) {
    case 'upcoming': {
      yield put(clearUpcomingGameData());
      break;
    }
    case 'champion': {
      yield put(clearChampionGameData());
      break;
    }
    case 'result': {
      yield put(clearResultGameData());
      break;
    }
    default:
      break;
  }
}

export default function* watchers() {
  yield fork(initalApp);
}
