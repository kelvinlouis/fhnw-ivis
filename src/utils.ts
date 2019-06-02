import { CandidateModel } from './models/candidate.model';
import { Party } from './models/party.enum';
import { ScaleLinear, scaleLinear, scaleQuantile } from 'd3-scale';
import { Chamber } from './models/chamber.enum';
import { COLOR_DOLLAR } from './constants';
import { Cycle } from './models/cycle.enum';

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

export const getPartyColorQuantile = (candidates: CandidateModel[]) => {
  return (chamber: Chamber) => {
    const filteredCandidates = candidates.filter(c => c.chamber === chamber);

    return (candidate: CandidateModel): string => {
      const colorScale = scaleQuantile<string>()
        .domain(filteredCandidates.map(c => c.filteredTotal));

      if (candidate.party === Party.Democrat) {
        const democratRange = ['#BCCAFF','#9DAEFF','#7D90FF','#5E6FFF','#3F4CFF','#1F27FF','#0000FF'];
        return filteredCandidates.length === 0 || candidate.filteredTotal === 0 ? '#DBE4FF' : colorScale.range(democratRange)(candidate.filteredTotal);
      } else if (candidate.party === Party.Independent) {
        const independentRange = ['#FFF9C5','#FFF5A4','#FFF283','#FFEE62','#FFEB42','#FFE821','#FFE400'];
        return filteredCandidates.length === 0 || candidate.filteredTotal === 0 ? '#FFFCE6' : colorScale.range(independentRange)(candidate.filteredTotal);
      } else if (candidate.party === Party.Republican) {
        const republicanRange = ['#FFC5D1','#FFA4B4','#FF8395','#FF6273','#FF424F','#FF2129','#FF0000'];
        return filteredCandidates.length === 0 || candidate.filteredTotal === 0 ? '#FFE6EC' : colorScale.range(republicanRange)(candidate.filteredTotal);
      } else {
        return 'white';
      }
    }
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

export const getOfficeName = (chamber: Chamber | string): string => {
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

export const getCongressName = (cycle: Cycle): string => {
  if (cycle === Cycle.Year2012) {
    return '112th United States Congress (2011-2013)';
  }else if (cycle === Cycle.Year2014) {
    return '113th United States Congress (2013-2015)';
  } else if (cycle === Cycle.Year2016) {
    return '114th United States Congress (2015-2017)';
  } else if (cycle === Cycle.Year2018) {
    return '115th United States Congress (2017-2019)';
  } else if (cycle === Cycle.Year2020) {
    return '116th United States Congress (2019-2021)';
  } else {
    return '';
  }
};
