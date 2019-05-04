import { CandidateModel } from './models/candidate.model';
import { Party } from './models/party.enum';

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

export const getPartyColor = (candidate: CandidateModel): string => {
  if (candidate.party === Party.Democrat) {
    return 'blue';
  } else if (candidate.party === Party.Independent) {
    return 'grey';
  } else if (candidate.party === Party.Republican) {
    return 'red'
  } else {
    return 'white';
  }
};

export const getPartyBorderColor = (candidate: CandidateModel): string => {
  if (candidate.party === Party.Democrat) {
    return 'blue';
  } else if (candidate.party === Party.Independent) {
    return 'grey';
  } else if (candidate.party === Party.Republican) {
    return 'red'
  } else {
    return 'black';
  }
};
