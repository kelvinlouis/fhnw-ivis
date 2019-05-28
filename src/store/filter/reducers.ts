import { Cycle } from '../../models/cycle.enum';
import { FilterActionTypes, FilterState, SET_CYCLE, SET_HIGHLIGHT, SET_INDUSTRY, SET_SECTOR } from './types';

const initialState: FilterState = {
  cycle: Cycle.Year2018,
  sector: 'total',
  industry: null,
  highlight: null,
};

export const filterReducer = (state: FilterState = initialState, action: FilterActionTypes): FilterState => {
  switch (action.type) {
    case SET_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
    case SET_SECTOR:
      return {
        ...state,
        sector: action.sector,
        industry: null,
      };
    case SET_INDUSTRY:
      return {
        ...state,
        industry: action.industry,
      };
    case SET_HIGHLIGHT:
      return {
        ...state,
        highlight: action.highlight,
      };
    default:
      return state;
  }
};
