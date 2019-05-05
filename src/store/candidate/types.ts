import { CandidateModel } from '../../models/candidate.model';

export const SET_SELECTED_CANDIDATE = 'SET_SELECTED_CANDIDATE';

interface SetSelectedCandidateAction {
  type: typeof SET_SELECTED_CANDIDATE;
  candidate: CandidateModel | null;
}

export interface CandidateState {
  selected: CandidateModel | null;
}

export type CandidateActionTypes = SetSelectedCandidateAction;
