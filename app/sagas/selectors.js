/* eslint-disable prettier/prettier */
/* global */
const selectGameListType = state => state.global.gameListType;
const selectMarketGameId = state => state.global.marketGameInfo.id;
const selectSummaryListDateRange = state => state.global.summaryListDateRange;
const selectGlobalAlerts = state => state.global.alerts;
const selectMainDataType = state => state.global.mainDataType;

/* account */
const selectAuthToken = state => state.account.AuthToken;
const selectAccountLang = state => state.account.lang;
const selectIsLogin = state => state.account.isLogin;

/* classifier */
const selectSportSelect = state => state.classifier.sportSelect;
const selectCompetitionSelect = state => state.classifier.competitionSelect;
const selectClassifierEntity = state => state.classifier.entity;
const selectClassifierSportSelect = state => state.classifier.sportSelect;
const selectClassifierCompetitionSelect = state => state.classifier.competitionSelect;

/* betslip */
const selectBetslipEntity = state => state.betslip.entity;
const selectStake = state => state.betslip.stake;
const selectBetType = state => state.betslip.betType;
const selectSystemNum = state => state.betslip.systemNum;
const selectBetslipKeys = state => state.betslip.keys;
const selectPriceChangeHandleType = state => state.betslip.priceChangeHandleType;
const selectGameLimit = state => state.betslip.gameLimit;
const selectSystemBetCount = state => state.betslip.systemBetCount;
const selectShowResult = state => state.betslip.showResult;

/* language */
const selectLanguage = state => state.language.locale;

/* gameResult */
const selectGameResultKeys = state => state.gameResult.keys;

/* betHistory */
const selectBetHistoryDateRange = state => state.betHistory.dateRange;
const selectBetHistoryDateRangeTimestamp = state => state.betHistory.dateRangeTimestamp;

/* balanceHistory*/
const selectBalanceHistoryDateRangeTimestamp = state => state.balanceHistory.dateRangeTimestamp;

/* upcomingGame */
const selectUpcomingDateRangeTimestamp = state => state.upcomingGame.dateRangeTimestamp;

/* championGame */
const selectChampionDateRangeTimestamp = state => state.championGame.dateRangeTimestamp;

/* resultDateRange */
const selectResultDateRangeTimestamp = state => state.resultGame.dateRangeTimestamp;
const selectResultGameKeys = state => state.resultGame.keys;


export {
  selectIsLogin,
  selectClassifierCompetitionSelect,
  selectShowResult,
  selectBalanceHistoryDateRangeTimestamp,
  selectBetHistoryDateRangeTimestamp,
  selectUpcomingDateRangeTimestamp,
  selectChampionDateRangeTimestamp,
  selectResultGameKeys,
  selectResultDateRangeTimestamp,
  selectClassifierSportSelect,
  selectGlobalAlerts,
  selectMainDataType,
  selectGameListType,
  selectSportSelect,
  selectCompetitionSelect,
  selectClassifierEntity,
  selectMarketGameId,
  selectSummaryListDateRange,
  selectGameResultKeys,
  selectAuthToken,
  selectBetHistoryDateRange,
  selectBetslipEntity,
  selectStake,
  selectBetType,
  selectSystemNum,
  selectBetslipKeys,
  selectPriceChangeHandleType,
  selectGameLimit,
  selectSystemBetCount,
  selectLanguage,
  selectAccountLang,
};



