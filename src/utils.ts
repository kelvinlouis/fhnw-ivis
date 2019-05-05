import { CandidateModel } from './models/candidate.model';
import { Party } from './models/party.enum';
import { scaleLinear } from 'd3-scale';

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

export const getPartyColor = (candidate: CandidateModel, max: number): string => {
  const domain = [0, max];

  const democratScale = scaleLinear<string>()
    .domain(domain)
    .range(['white', 'blue']);
  const independentScale = scaleLinear<string>()
    .domain(domain)
    .range(['white', 'grey']);
  const republicanScale = scaleLinear<string>()
    .domain(domain)
    .range(['white', 'red']);

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
});

export const formatMoney = (value: number) => {
  return moneyFormatter.format(value);
};
