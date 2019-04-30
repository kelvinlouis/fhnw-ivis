import { combineReducers } from 'redux';
import { filterReducer } from './filter/reducers';

const appReducer = combineReducers({
  filter: filterReducer,
});

export type AppState = ReturnType<typeof appReducer>
export default appReducer;
