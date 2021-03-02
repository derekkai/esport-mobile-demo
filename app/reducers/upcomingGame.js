import produce from 'immer';
import {
  daysToTimestampRange,
  gamelistDataHandler,
  subscribeDataHandler,
} from 'helpers/common';
import { upcomingGameDefaultDays } from 'settings';

const defaultDateRangeTimestamp = daysToTimestampRange(
  false,
  upcomingGameDefaultDays,
);

const prefix = 'upcomingGame';
export const SET_UPCOMING_GAME_UI_STATE = `${prefix}/SET_UPCOMING_GAME_UI_STATE`;
export const REQUEST_UPCOMING_GAME_DATA = `${prefix}/REQUEST_UPCOMING_GAME_DATA`;
export const SET_UPCOMING_GAME_DATA = `${prefix}/SET_UPCOMING_GAME_DATA`;
export const CLEAR_UPCOMING_GAME_DATA = `${prefix}/CLEAR_UPCOMING_GAME_DATA`;
export const UPDATE_UPCOMING_GAME_DATA = `${prefix}/UPDATE_UPCOMING_GAME_DATA`;

export const requestUpcomingGameData = () => ({
  type: REQUEST_UPCOMING_GAME_DATA,
});

/**
 * Set game upcoming data.
 * @param {Object} payload game data
 */
export const setUpcomingGameData = payload => ({
  type: SET_UPCOMING_GAME_DATA,
  payload,
});

/**
 * Clear game upcoming data.
 */
export const clearUpcomingGameData = () => ({
  type: CLEAR_UPCOMING_GAME_DATA,
});
/**
 * Update game upcoming data.
 * @param {Object} payload new game data
 */
export const updateUpcomingGameData = payload => ({
  type: UPDATE_UPCOMING_GAME_DATA,
  payload,
});

export const setUpcomingGameUIState = payload => ({
  type: SET_UPCOMING_GAME_UI_STATE,
  payload,
});

const initalState = {
  dateRangeDays: upcomingGameDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  prevUIState: {
    scrollTop: 0,
    displayItemCount: 12,
  },
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_UPCOMING_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, true);
        break;
      }
      case UPDATE_UPCOMING_GAME_DATA: {
        subscribeDataHandler(draft, action.payload, true);
        break;
      }
      case CLEAR_UPCOMING_GAME_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
      case SET_UPCOMING_GAME_UI_STATE: {
        draft.prevUIState = {
          ...draft.prevUIState,
          ...action.payload,
        };
        break;
      }
    }
  });
