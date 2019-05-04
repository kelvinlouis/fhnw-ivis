import { Cycle } from '../../models/cycle.enum';
import { FilterActionTypes, SET_CYCLE, SET_INDUSTRY, SET_SECTOR } from './types';

export const setCycle = (cycle: Cycle): FilterActionTypes => {
  return {
    type: SET_CYCLE,
    cycle,
  };
};

export const setSector = (sector: string): FilterActionTypes => {
  return {
    type: SET_SECTOR,
    sector,
  };
};


export const setIndustry = (industry: string | null): FilterActionTypes => {
  return {
    type: SET_INDUSTRY,
    industry,
  };
};

