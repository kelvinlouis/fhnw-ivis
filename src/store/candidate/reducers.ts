import { CandidateActionTypes, CandidateState, SET_SELECTED_CANDIDATE } from './types';

const initialState: CandidateState = {
  selected: null,
};

export const candidateReducer = (state: CandidateState = initialState, action: CandidateActionTypes): CandidateState => {
  switch (action.type) {
    case SET_SELECTED_CANDIDATE:
      return {
        ...state,
        selected: action.candidate,
      };
    default:
      return state;
  }
};
