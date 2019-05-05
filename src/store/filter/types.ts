import { Cycle } from '../../models/cycle.enum';

export const SET_CYCLE = 'SET_CYCLE';
export const SET_SECTOR = 'SET_SECTOR';
export const SET_INDUSTRY = 'SET_INDUSTRY';

export type Industry = string | null;
export type Sector = string;

interface SetCycleAction {
  type: typeof SET_CYCLE;
  cycle: Cycle;
}

interface SetSectorAction {
  type: typeof SET_SECTOR;
  sector: Sector;
}

interface SetIndustryAction {
  type: typeof SET_INDUSTRY;
  industry: Industry;
}

export interface FilterState {
  cycle: Cycle;
  sector: Sector;
  industry: Industry;
}

export type FilterActionTypes = SetCycleAction | SetSectorAction | SetIndustryAction;
