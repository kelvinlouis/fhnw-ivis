import { Cycle } from '../../models/cycle.enum';
import { FilterActionTypes, SET_CYCLE } from './types';

export const setCycle = (cycle: Cycle): FilterActionTypes => {
  return {
    type: SET_CYCLE,
    cycle,
  };
};
