import { Cycle } from '../../models/cycle.enum';
import { FilterActionTypes, FilterState, SET_CYCLE } from './types';

const initialState: FilterState = {
  cycle: Cycle.Year2018,
};

export const filterReducer = (state: FilterState = initialState, action: FilterActionTypes): FilterState => {
  switch (action.type) {
    case SET_CYCLE:
      return {
        cycle: action.cycle,
      };
    default:
      return state;
  }
};
