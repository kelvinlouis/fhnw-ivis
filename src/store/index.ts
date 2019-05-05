import { combineReducers } from 'redux';
import { filterReducer } from './filter/reducers';
import { candidateReducer } from './candidate/reducers';
import { FilterState } from './filter/types';
import { CandidateState } from './candidate/types';

export interface AppState {
  filter: FilterState;
  candidate: CandidateState;
}

const appReducer = combineReducers({
  filter: filterReducer,
  candidate: candidateReducer,
});

export default appReducer;
