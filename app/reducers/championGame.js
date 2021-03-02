import produce from 'immer';
import {
  daysToTimestampRange,
  gamelistDataHandler,
  subscribeDataHandler,
} from 'helpers/common';
import { championGameDefaultDays } from 'settings';
/**
 * 初始化產生Date Range 的 days 和 timestamp.
 */
const defaultDateRangeTimestamp = daysToTimestampRange(
  false,
  championGameDefaultDays,
);

export const prefix = 'championGame';
export const SET_CHAMPION_GAME_DATA = `${prefix}/SET_CHAMPION_GAME_DATA`;
export const UPDATE_CHAMPION_GAME_DATA = `${prefix}/UPDATE_CHAMPION_GAME_DATA`;
export const CLEAR_CHAMPION_GAME_DATA = `${prefix}/CLEAR_CHAMPION_GAME_DATA`;
export const REQUEST_CHAMPION_GAME_DATA = `${prefix}/REQUEST_CHAMPION_GAME_DATA`;

/**
 * Set game champion data.
 * @param {Object} payload game champion data.
 */
export const setChampionGameData = payload => ({
  type: SET_CHAMPION_GAME_DATA,
  payload,
});

/**
 * Update game champion data.
 * @param {Object} payload game champion update data.
 */
export const updateChampionGameData = payload => ({
  type: UPDATE_CHAMPION_GAME_DATA,
  payload,
});

/**
 * Clear game champion data.
 */
export const clearChampionGameData = () => ({
  type: CLEAR_CHAMPION_GAME_DATA,
});

export const requestChampionGameData = () => ({
  type: REQUEST_CHAMPION_GAME_DATA,
});

const initalState = {
  dateRangeDays: championGameDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CHAMPION_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, true);
        break;
      }
      case UPDATE_CHAMPION_GAME_DATA: {
        subscribeDataHandler(draft, action.payload, true);
        break;
      }
      case CLEAR_CHAMPION_GAME_DATA: {
        draft.keys = [];
        draft.entity = {};
        break;
      }
    }
  });
