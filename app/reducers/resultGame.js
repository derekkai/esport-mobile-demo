import produce from 'immer';
import { resultGameDefaultDays } from 'settings';
import { gamelistDataHandler, daysToTimestampRange } from 'helpers/common';

const defaultDateRangeTimestamp = daysToTimestampRange(
  true,
  resultGameDefaultDays,
);

const prefix = 'resultGame';
export const CLEAR_RESULT_GAME_DATA = `${prefix}/CLEAR_RESULT_GAME_DATA`;
export const SET_RESULT_GAME_DATA = `${prefix}/SET_RESULT_GAME_DATA`;
export const REQUEST_RESULT_GAME_DATA = `${prefix}/REQUEST_RESULT_GAME_DATA`;

/**
 * Set game result data.
 * @param {Object} payload game data
 */
export const setResultGameData = payload => ({
  type: SET_RESULT_GAME_DATA,
  payload,
});

/**
 * Clear game result data.
 */
export const clearResultGameData = () => ({
  type: CLEAR_RESULT_GAME_DATA,
});

export const requestResultGameData = () => ({
  type: REQUEST_RESULT_GAME_DATA,
});

const initalState = {
  dateRangeDays: resultGameDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_RESULT_GAME_DATA: {
        gamelistDataHandler(draft, action.payload, true, false);
        break;
      }
      case CLEAR_RESULT_GAME_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
    }
  });
