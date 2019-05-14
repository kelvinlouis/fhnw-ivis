import { CandidateModel } from './models/candidate.model';
import { Party } from './models/party.enum';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { Chamber } from './models/chamber.enum';
import {
  COLOR_DEMOCRAT,
  COLOR_DEMOCRAT_LIGHT, COLOR_DOLLAR,
  COLOR_INDEPENDENT,
  COLOR_INDEPENDENT_LIGHT,
  COLOR_REPUBLICAN, COLOR_REPUBLICAN_LIGHT
} from './constants';

export const compareByFullName = (c1: CandidateModel, c2: CandidateModel): number => {
  const name1 = c1.fullName.toUpperCase();
  const name2 = c2.fullName.toUpperCase();

  return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
};

export const compareByName = (c1: CandidateModel, c2: CandidateModel): number => {
  const name1 = c1.name.toUpperCase();
  const name2 = c2.name.toUpperCase();

  return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
};

export const getLinearColorScale = (min: number, max: number, minColor: string, maxColor: string): ScaleLinear<string, string> => {
  const domain = [min, max];
  const range = [minColor, maxColor];

  return scaleLinear<string>()
    .domain(domain)
    .range(range);
};

export const getDolorLinearScale = (min: number, max: number): ScaleLinear<string, string> => {
  return getLinearColorScale(min, max, 'white', COLOR_DOLLAR);
};

export const getDemocratLinearScale = (min: number, max: number): ScaleLinear<string, string> => {
  return getLinearColorScale(0, max, COLOR_DEMOCRAT_LIGHT, COLOR_DEMOCRAT);
};

export const getIndependentLinearScale = (min: number, max: number): ScaleLinear<string, string> => {
  return getLinearColorScale(0, max, COLOR_INDEPENDENT_LIGHT, COLOR_INDEPENDENT);
};

export const getRepublicanLinearScale = (min: number, max: number): ScaleLinear<string, string> => {
  return getLinearColorScale(0, max, COLOR_REPUBLICAN_LIGHT, COLOR_REPUBLICAN);
};

export const getPartyColor = (candidate: CandidateModel, max: number): string => {
  const democratScale = getDemocratLinearScale(0, max);
  const independentScale = getIndependentLinearScale(0, max);
  const republicanScale = getRepublicanLinearScale(0, max);

  if (candidate.party === Party.Democrat) {
    return democratScale(candidate.total);
  } else if (candidate.party === Party.Independent) {
    return independentScale(candidate.total);
  } else if (candidate.party === Party.Republican) {
    return republicanScale(candidate.total);
  } else {
    return 'white';
  }
};

export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
});

export const formatMoney = (value: number) => {
  return moneyFormatter.format(value);
};

export const getPartyName = (party: Party | string): string => {
  if (party === Party.Republican) {
    return 'Republican';
  } else if (party === Party.Independent) {
    return 'Independent';
  } else if (party === Party.Democrat) {
    return 'Democrat';
  } else {
    return '';
  }
};

export const getFunctionName = (chamber: Chamber | string): string => {
  if (chamber === Chamber.House) {
    return 'Representative';
  } else if (chamber === Chamber.Senate) {
    return 'Senator';
  } else {
    return '';
  }
};

export const calculateAge = (birthday: Date): number => {
  const diff = Date.now() - birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US')
    .format(date);
};
