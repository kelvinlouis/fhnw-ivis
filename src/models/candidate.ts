import { Contributor } from './contributor';

export interface Candidate {
  cid: string;
  bioid: string;
  name: string;
  cycle: number;
  party: string;
  chamber: string;
  state: string;
  birthday: string;
  contributors?: Contributor[];
}
