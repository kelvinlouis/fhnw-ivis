import { Party } from './party.enum';
import { Chamber } from './chamber.enum';
import { Candidate } from './candidate';
import { Cycle } from './cycle.enum';

export class CandidateModel {
  public readonly cid: string;
  public readonly name: string;
  public readonly fullName: string;
  public readonly cycle: Cycle | number;
  public readonly party: Party | string;
  public readonly chamber: Chamber | string;
  public readonly state: string;
  public readonly total: number;

  constructor(candidate: Candidate, total: number) {
    const nameParts = candidate.name.split(',');

    this.cid = candidate.cid;
    this.name = candidate.name;
    this.fullName = `${nameParts[1]} ${nameParts[0]}`;
    this.cycle = +candidate.cycle;
    this.party = candidate.party;
    this.chamber = candidate.chamber;
    this.state = candidate.state;
    this.total = total;
  }
}
