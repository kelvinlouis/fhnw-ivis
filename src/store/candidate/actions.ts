import { CandidateModel } from '../../models/candidate.model';
import { CandidateActionTypes, SET_SELECTED_CANDIDATE } from './types';

export const setSelectedCandidate = (candidate: CandidateModel | null): CandidateActionTypes => ({
  type: SET_SELECTED_CANDIDATE,
  candidate,
});
