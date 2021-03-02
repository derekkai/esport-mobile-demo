import produce from 'immer';
// import { createDateRange } from 'helpers/common';
import { daysToTimestampRange, timestampRangeToDays } from 'helpers/common';
import settings from 'settings';

const { betHistoryDefaultDays } = settings;
const defaultDateRangeTimestamp = daysToTimestampRange(
  true,
  betHistoryDefaultDays,
);

const prefix = 'betHistory';
export const REQUEST_BET_HISTORY = `${prefix}/REQUEST_BET_HISTORY`;
export const SET_BET_HISTORY = `${prefix}/SET_BET_HISTORY`;
export const SET_BET_HISTORY_DATE_RANGE = `${prefix}/SET_BET_HISTORY_DATE_RANGE`;
export const CLEAR_BET_HISTORY = `${prefix}/CLEAR_BET_HISTORY`;
export const SET_BET_HISTORY_FILTER_BET_TYPE = `${prefix}/SET_BET_HISTORY_FILTER_BET_TYPE`;
export const RESET_BET_HISTORY_DATE_RANGE = `${prefix}/RESET_BET_HISTORY_DATE_RANGE`;

/**
 * Request bet history data.
 */
export const requestBetHistory = () => ({
  type: REQUEST_BET_HISTORY,
});

/**
 * Set bet history data.
 * @param {Object} payload bet history data
 */
export const setBetHistory = payload => ({
  type: SET_BET_HISTORY,
  payload,
});

/**
 * Set bet history date range.
 * @param {Object} payload date range data.
 * @param {number} payload.from from date of range.
 * @param {number} payload.to end date of range.
 */
export const setBetHistoryDateRange = payload => ({
  type: SET_BET_HISTORY_DATE_RANGE,
  payload,
});

/**
 * Clear balance history data.
 */
export const clearBetHistory = () => ({
  type: CLEAR_BET_HISTORY,
});

export const setBetHistoryFilterBetType = payload => ({
  type: SET_BET_HISTORY_FILTER_BET_TYPE,
  payload,
});

export const resetBetHistoryDateRange = () => ({
  type: RESET_BET_HISTORY_DATE_RANGE,
});

export const initalState = {
  dateRangeDays: betHistoryDefaultDays,
  dateRangeTimestamp: defaultDateRangeTimestamp,
  filterBetType: settings.betHistoryDefaultBetType,
  entity: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BET_HISTORY: {
        draft.entity = action.payload;
        break;
      }
      case SET_BET_HISTORY_DATE_RANGE: {
        const { type, value } = action.payload;
        if (type === 'days') {
          draft.dateRangeDays = Number(value);
          draft.dateRangeTimestamp = daysToTimestampRange(true, value);
        } else {
          draft.dateRangeTimestamp[type] = value;
          draft.dateRangeDays = Number(
            timestampRangeToDays({
              ...draft.dateRangeTimestamp,
              [type]: value,
            }),
          );
        }
        break;
      }
      case CLEAR_BET_HISTORY:
        draft.entity = [];
        break;
      case SET_BET_HISTORY_FILTER_BET_TYPE: {
        draft.filterBetType = action.payload;
        break;
      }
      case RESET_BET_HISTORY_DATE_RANGE: {
        draft.dateRangeDays = betHistoryDefaultDays;
        draft.dateRangeTimestamp = defaultDateRangeTimestamp;
        break;
      }
    }
  });
