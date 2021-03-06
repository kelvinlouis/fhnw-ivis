import { Party } from './party.enum';
import { Chamber } from './chamber.enum';
import { Candidate } from './candidate';
import { Cycle } from './cycle.enum';
import { ContributorModel } from './contributor.model';
import { calculateAge, getOfficeName, getPartyName } from '../utils';

export class CandidateModel {
  public readonly cid: string;
  public readonly bioid: string;
  public readonly name: string;
  public readonly fullName: string;
  public readonly cycle: Cycle | number;
  public readonly party: Party | string;
  public readonly chamber: Chamber | string;
  public readonly state: string;
  public readonly birthday: Date;
  public readonly filteredTotal: number;
  public readonly total: number;
  public readonly contributors: ContributorModel[];

  public get age(): number {
    return calculateAge(this.birthday);
  }

  public get partyName(): string {
    return getPartyName(this.party);
  }

  public get office(): string {
    return getOfficeName(this.chamber);
  }

  constructor(candidate: Candidate, filteredTotal: number, total: number) {
    const nameParts = candidate.name.split(',');

    this.cid = candidate.cid;
    this.bioid = candidate.bioid;
    this.name = candidate.name;
    this.fullName = `${nameParts[1]} ${nameParts[0]}`;
    this.cycle = +candidate.cycle;
    this.party = candidate.party;
    this.chamber = candidate.chamber;
    this.state = candidate.state;
    this.birthday = new Date(candidate.birthday);
    this.filteredTotal = filteredTotal;
    this.total = total;

    if (candidate.contributors != null) {
      this.contributors = candidate.contributors.map(c => new ContributorModel(c));
    } else {
      this.contributors = [];
    }
  }

  public isDemocrat(): boolean {
    return this.party === Party.Democrat
  }

  public isRepublican(): boolean {
    return this.party === Party.Republican
  }

  public isIndependent(): boolean {
    return this.party === Party.Independent
  }

  public isVacant(): boolean {
    return this.party === Party.Vacant
  }
}
