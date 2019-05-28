import { Cycle } from '../../models/cycle.enum';
import {
  FilterActionTypes,
  HighlightFilter,
  Industry,
  Sector,
  SET_CYCLE, SET_HIGHLIGHT,
  SET_INDUSTRY,
  SET_SECTOR,
} from './types';

export const setCycle = (cycle: Cycle): FilterActionTypes => ({
  type: SET_CYCLE,
  cycle,
});

export const setSector = (sector: Sector): FilterActionTypes => ({
  type: SET_SECTOR,
  sector,
});

export const setIndustry = (industry: Industry): FilterActionTypes => ({
  type: SET_INDUSTRY,
  industry,
});

export const setHighlight = (highlight: HighlightFilter | null): FilterActionTypes => ({
  type: SET_HIGHLIGHT,
  highlight,
});

