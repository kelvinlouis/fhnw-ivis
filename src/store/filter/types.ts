import { Cycle } from '../../models/cycle.enum';
import { Chamber } from '../../models/chamber.enum';
import { Party } from '../../models/party.enum';

export const SET_CYCLE = 'SET_CYCLE';
export const SET_SECTOR = 'SET_SECTOR';
export const SET_INDUSTRY = 'SET_INDUSTRY';
export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';

export type Industry = string | null;
export type Sector = string;

export interface HighlightFilter {
  chamber: Chamber;
  party: Party;
}

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

interface SetHighlightAction {
  type: typeof SET_HIGHLIGHT;
  highlight: HighlightFilter | null;
}

export interface FilterState {
  cycle: Cycle;
  sector: Sector;
  industry: Industry;
  highlight: HighlightFilter | null;
}

export type FilterActionTypes = SetCycleAction | SetSectorAction | SetIndustryAction | SetHighlightAction;
