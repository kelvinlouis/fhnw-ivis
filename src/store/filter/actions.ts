import { Cycle } from '../../models/cycle.enum';
import {
  FilterActionTypes,
  Industry,
  Sector,
  SET_CYCLE,
  SET_INDUSTRY,
  SET_SECTOR,
} from './types';

export const setCycle = (cycle: Cycle): FilterActionTypes => {
  return {
    type: SET_CYCLE,
    cycle,
  };
};

export const setSector = (sector: Sector): FilterActionTypes => {
  return {
    type: SET_SECTOR,
    sector,
  };
};


export const setIndustry = (industry: Industry): FilterActionTypes => {
  return {
    type: SET_INDUSTRY,
    industry,
  };
};

