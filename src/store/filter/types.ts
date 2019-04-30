import { Cycle } from '../../models/cycle.enum';

export const SET_CYCLE = 'SET_CYCLE';

interface SetCycleAction {
  type: typeof SET_CYCLE;
  cycle: Cycle;
}

export interface FilterState {
  cycle: Cycle;
}

export type FilterActionTypes = SetCycleAction;
