import produce from 'immer';
import extend from 'extend';
import _ from 'lodash';
import history from 'utils/history';

const prefix = 'global';
export const SET_LOADING_STATUS = `${prefix}/SET_LOADING_STATUS`;
export const REQUEST_MARKET_GAMEINFO = `${prefix}/REQUEST_MARKET_GAMEINFO`;
export const SET_GAME_LIST_TYPE = `${prefix}/SET_GAME_LIST_TYPE`;
export const SET_MAIN_DATA_TYPE = `${prefix}/SET_MAIN_DATA_TYPE`;
export const REQUEST_NEXT_SUMMARY_LIST_DATA = `${prefix}/REQUEST_NEXT_SUMMARY_LIST_DATA`;
export const RQEUEST_SUMMARY_LIST_DATA = `${prefix}/RQEUEST_SUMMARY_LIST_DATA`;
export const REQUEST_MARKET_LIST_DATA = `${prefix}/REQUEST_MARKET_LIST_DATA`;
export const SET_SUMMARY_DATE_RANGE = `${prefix}/SET_SUMMARY_DATE_RANGE`;
const CLOSE_MODAL = `${prefix}/CLOSE_MODAL`;
const OPEN_MODAL = `${prefix}/OPEN_MODAL`;
const CLEAR_MARKET_GAMEINFO = `${prefix}/CLEAR_MARKET_GAMEINFO`;
const SET_MARKET_GAMEINFO = `${prefix}/SET_MARKET_GAMEINFO`;
const SET_MARKET_GAMEINFO_GAMEID = `${prefix}/SET_MARKET_GAMEINFO_GAMEID`;
export const REQUEST_ID_NAME_MAP = `${prefix}/REQUEST_ID_NAME_MAP`;
export const INITAL_APP = `${prefix}/INITAL_APP`;
const UPDATE_MARKET_GAME_INFO = `${prefix}/UPDATE_MARKET_GAME_INFO`;
const CLEAR_LOADDOWN_STATUS = `${prefix}/CLEAR_LOADDOWN_STATUS`;
const OPEN_KEYBOARD = `${prefix}/OPEN_KEYBOARD`;
const SET_KEYBOARD_HANDLE_FUNC = `${prefix}/SET_KEYBOARD_HANDLE_FUNC`;
const SET_SUMMARY_ITEM_RENDER_COUNT = `${prefix}/SET_SUMMARY_ITEM_RENDER_COUNT`;
export const SET_MARKET_GAMEINFO_SPORTID = `${prefix}/SET_MARKET_GAMEINFO_SPORTID`;
export const SET_ALERT = `${prefix}/SET_ALERT`;
export const SET_SERVER_OFFLINE = `${prefix}/SET_SERVER_OFFLINE`;

export const initalApp = () => ({
  type: INITAL_APP,
});
/**
 * Open/close modal.
 * @param {string} payload : modal name
 */
export const openModal = payload => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

/**
 * Set summary list type.
 * @param {string} payload : type name
 */
export const setGameListType = payload => ({
  type: SET_GAME_LIST_TYPE,
  payload,
});

export const setSummaryDateRange = payload => ({
  type: SET_SUMMARY_DATE_RANGE,
  payload,
});

/**
 * Request Summary list data.
 */
export const requestSummaryListData = () => ({
  type: RQEUEST_SUMMARY_LIST_DATA,
});

/**
 * Request Market list data.
 */
export const requestMarketListData = () => ({
  type: REQUEST_MARKET_LIST_DATA,
});

/**
 * Set Data View point.
 * @param {string} payload: data view point.
 */
export const setMainDataType = payload => ({
  type: SET_MAIN_DATA_TYPE,
  payload,
});

/**
 * Set UI loading status.
 * @param {Object} payload
 * @param {string} payload.name: ui name
 * @param {string} payload.value: status
 */
export const setLoadingStatus = payload => ({
  type: SET_LOADING_STATUS,
  payload,
});

/**
 * Set game id.
 * @param {string} payload game id
 */
export const setMarketGameInfoGameId = payload => ({
  type: SET_MARKET_GAMEINFO_GAMEID,
  payload,
});

/**
 * Request Game info on market page.
 * @param {Object} payload
 * @param {number} payload.gameId
 * @param {string} payload.type summary type
 */
export const requestMarketGameInfo = () => ({
  type: REQUEST_MARKET_GAMEINFO,
});

/**
 * Clear game info on market page.
 */
export const clearMarketGameInfo = () => ({
  type: CLEAR_MARKET_GAMEINFO,
});

/**
 * Set market game info
 * @param {any} payload game info
 */
export const setMarketGameInfo = payload => ({
  type: SET_MARKET_GAMEINFO,
  payload,
});

/**
 * Request next of summary list data.
 */
export const requestNextSummaryListData = () => ({
  type: REQUEST_NEXT_SUMMARY_LIST_DATA,
});

export const setMarketGameInfoSportId = payload => ({
  type: SET_MARKET_GAMEINFO_SPORTID,
  payload,
});

/**
 * Update market game information.
 * @param {Object} payload game information data.
 */
export const updateMarketGameInfo = payload => ({
  type: UPDATE_MARKET_GAME_INFO,
  payload,
});

export const clearLoadDownStatus = payload => ({
  type: CLEAR_LOADDOWN_STATUS,
  payload,
});

export const openKeyBoard = payload => ({
  type: OPEN_KEYBOARD,
  payload,
});

/**
 * Set handle function when keyboard press done.
 * @param {*} payload handle function
 */
export const setKeyBoardHandleFunc = payload => ({
  type: SET_KEYBOARD_HANDLE_FUNC,
  payload,
});

export const setSummaryItemRenderCount = payload => ({
  type: SET_SUMMARY_ITEM_RENDER_COUNT,
  payload,
});

export const setAlert = payload => ({
  type: SET_ALERT,
  payload,
});

export const setServerOffline = () => ({
  type: SET_SERVER_OFFLINE,
});

const overwriteState = () => {
  let gameListType = 'upcoming';
  let mainDataType = 'game';
  let modal = '';
  const { pathname } = history.location;
  const paths = pathname.split('/');
  const [, urlGameListType, urlViewPoint] = paths;

  if (urlViewPoint === 'market') {
    mainDataType = 'market';
  } else {
    mainDataType = 'game';
  }

  switch (urlGameListType) {
    case '':
    case 'upcoming':
      gameListType = 'upcoming';
      break;
    case 'result':
      gameListType = 'result';
      break;
    case 'champion':
      gameListType = 'champion';
      break;
    case 'betslip':
      modal = 'betslip';
      break;
    case 'record':
      modal = 'record';
      break;
    case 'news':
      modal = 'news';
      break;
    default:
      break;
  }
  return {
    gameListType,
    mainDataType,
    modal,
  };
};

export const initalState = {
  isSafariBrowser:
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  isKeyBoardOpen: false,
  isKeyBoardDecimal: false,
  keyBoardHandleFunc: () => {},
  marketGameInfo: {
    competition: { id: 0 },
    sport: { id: 0 },
    id: 0,
    team1_name: '',
    team2_name: '',
    team1_id: 0,
    team2_id: 0,
    type: 0,
    final_score: '',
    start_ts: 0,
    is_closed: false,
  },
  modal: '',
  gameListType: 'upcoming',
  summaryListDateRange: {},
  mainDataType: 'game',
  summaryItemRenderCount: 0,
  loading: {
    initalApp: false,
    classifier: false,
    summaryList: false,
    balanceHistory: false,
    betHistory: false,
    marketGameInfo: false,
    upcomingGame: false,
    championGame: false,
    resultGame: false,
  },
  loadDown: {
    initalApp: false,
    classifier: false,
    summaryList: false,
    balanceHistory: false,
    betHistory: false,
    marketGameInfo: false,
    upcomingGame: false,
    championGame: false,
    resultGame: false,
  },
  offline: false,
  alerts: [],
  ...overwriteState(),
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        draft.modal = action.payload;
        break;
      case CLOSE_MODAL:
        draft.modal = '';
        break;
      case SET_GAME_LIST_TYPE:
        draft.gameListType = action.payload;
        break;
      case SET_MAIN_DATA_TYPE:
        draft.mainDataType = action.payload;
        break;
      case SET_LOADING_STATUS:
        draft.loading[action.payload.name] = action.payload.value;
        if (!action.payload.value) {
          draft.loadDown[action.payload.name] = true;
        }
        break;
      case CLEAR_LOADDOWN_STATUS:
        draft.loadDown[action.payload] = false;
        break;
      case SET_MARKET_GAMEINFO: {
        try {
          const sportData = Object.values(action.payload.sport)[0];
          const sportName = sportData.name;
          const competitionData = Object.values(sportData.competition)[0];
          const competitionName = competitionData.name;
          const gameData = Object.values(competitionData.game)[0];
          extend(true, draft.marketGameInfo, gameData);
          draft.marketGameInfo.competitionName = competitionName;
          draft.marketGameInfo.sportName = sportName;
        } catch (e) {
          console.error('market game info error :', e);
          console.error('data:', action.payload);
          draft.marketPageError = true;
        }
        break;
      }
      case CLEAR_MARKET_GAMEINFO: {
        draft.marketGameInfo = {
          competition: { id: 0 },
          sport: { id: 0 },
          id: 0,
          team1_name: '',
          team2_name: '',
          team1_id: 0,
          team2_id: 0,
          type: 0,
          final_score: '',
          start_ts: 0,
          is_closed: false,
        };
        draft.loadDown.battleHeader = false;
        break;
      }
      case SET_MARKET_GAMEINFO_GAMEID:
        draft.marketGameInfo.id = action.payload;
        break;
      case SET_SUMMARY_DATE_RANGE: {
        const { startDate, endDate } = action.payload;
        draft.summaryListDateRange.from = startDate;
        draft.summaryListDateRange.to = endDate;
        break;
      }
      case SET_MARKET_GAMEINFO_SPORTID: {
        draft.marketGameInfo.sport.id = action.payload;
        break;
      }
      case UPDATE_MARKET_GAME_INFO: {
        Object.values(action.payload.sport).forEach(sportValue => {
          Object.values(sportValue.region).forEach(regionValue => {
            Object.values(regionValue.competition).forEach(competitionValue => {
              Object.values(competitionValue.game).forEach(gameValue => {
                extend(true, draft.marketGameInfo, gameValue);
              });
            });
          });
        });
        break;
      }
      case OPEN_KEYBOARD: {
        const { open, decimal } = action.payload;
        draft.isKeyBoardOpen = open;
        draft.isKeyBoardDecimal = decimal;
        break;
      }
      case SET_KEYBOARD_HANDLE_FUNC: {
        draft.keyBoardHandleFunc = action.payload;
        break;
      }
      case SET_SUMMARY_ITEM_RENDER_COUNT: {
        draft.summaryItemRenderCount = action.payload;
        break;
      }
      case SET_ALERT: {
        const { type, value } = action.payload;
        if (value && !draft.alerts.includes(type)) {
          draft.alerts.push(type);
        } else if (!value) {
          _.remove(draft.alerts, el => el === type);
        }
        break;
      }
      case SET_SERVER_OFFLINE: {
        draft.offline = true;
        break;
      }
    }
  });
