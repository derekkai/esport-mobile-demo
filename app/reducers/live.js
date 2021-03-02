import produce from 'immer';
import { subscribeDataHandler, gamelistDataHandler } from 'helpers/common';

const prefix = 'live';
const SET_CURRENT_SELECT_GAME_ID = `${prefix}/SET_CURRENT_SELECT_GAME_ID`;
const UPDATE_LIVE_DATA = `${prefix}/UPDATE_LIVE_DATA`;
export const REQUEST_LIVE_DATA = `${prefix}/REQUEST_LIVE_DATA`;
const SET_LIVE_DATA = `${prefix}/SET_LIVE_DATA`;

/**
 * Set current live select game id.
 * @param {number} payload game id
 */
export const setCurrentSelectGameId = payload => ({
  type: SET_CURRENT_SELECT_GAME_ID,
  payload,
});

/**
 * Update live data.
 * @param {Object} payload update data.
 */
export const updateLiveData = payload => ({
  type: UPDATE_LIVE_DATA,
  payload,
});

/**
 * Request live data.
 */
export const requestLiveData = () => ({
  type: REQUEST_LIVE_DATA,
});

/**
 * Set live data.
 * @param {Object} payload live data.
 */
export const setLiveData = payload => ({
  type: SET_LIVE_DATA,
  payload,
});

const initalState = {
  currentSelectGameId: '',
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LIVE_DATA: {
        gamelistDataHandler(draft, action.payload, false);
        break;
      }
      case SET_CURRENT_SELECT_GAME_ID:
        draft.currentSelectGameId = action.payload;
        break;
      case UPDATE_LIVE_DATA: {
        subscribeDataHandler(draft, action.payload, false);
        if (!draft.keys.includes(draft.currentSelectGameId)) {
          if (draft.keys.length > 0) {
            [draft.currentSelectGameId] = draft.keys;
          } else {
            draft.currentSelectGameId = '';
          }
        }
        break;
      }
    }
  });
