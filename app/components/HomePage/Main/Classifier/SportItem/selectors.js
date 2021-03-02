import { createSelector } from 'reselect';

const selectCompetition = (state, props) => props.competitionData;
const selectClassifierCompetitionSelect = (state, props) =>
  state.classifier.competitionSelect[props.sportId];
const selectSportId = (state, props) => props.sportId;
const selectView = state => state.classifier.sportSelect;

export const makeSportCount = () =>
  createSelector(
    selectCompetition,
    state => {
      let totalCount = 0;
      Object.values(state).forEach(el => {
        if (el.game) {
          totalCount += Object.keys(el.game).length;
        }
      });
      return totalCount;
    },
  );

export const makeActive = () =>
  createSelector(
    [selectView, selectClassifierCompetitionSelect, selectSportId],
    (sportSelect, competitionSelect, id) => {
      if (id === sportSelect || competitionSelect) {
        return true;
      }
      return false;
    },
  );
