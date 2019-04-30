export const SET_CYCLE = 'SET_CYCLE';

interface SetCycleAction {
  type: typeof SET_CYCLE;
  cycle: number;
}

export type FilterActionTypes = SetCycleAction;
