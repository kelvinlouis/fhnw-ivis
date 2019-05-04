import { Cycle } from '../../models/cycle.enum';

export const SET_CYCLE = 'SET_CYCLE';
export const SET_SECTOR = 'SET_SECTOR';
export const SET_INDUSTRY = 'SET_INDUSTRY';

interface SetCycleAction {
  type: typeof SET_CYCLE;
  cycle: Cycle;
}

interface SetSectorAction {
  type: typeof SET_SECTOR;
  sector: string;
}

interface SetIndustryAction {
  type: typeof SET_INDUSTRY;
  industry: string | null;
}

export interface FilterState {
  cycle: Cycle;
  sector: string;
  industry: string | null;
}

export type FilterActionTypes = SetCycleAction | SetSectorAction | SetIndustryAction;
