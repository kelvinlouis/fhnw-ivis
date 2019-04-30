import { FilterActionTypes } from '../actions/filters';

interface FilterState {
  cycle: number;
}

const initialState: FilterState = {
  cycle: 2018
};

export function filters(state: FilterState = initialState, action: FilterActionTypes) {
    return state;
}
