import { Contributor } from './contributor';

export class ContributorModel {
  public readonly name: string;
  public readonly indivs: number;
  public readonly pacs: number;
  public readonly total: number;

  constructor(contributor: Contributor) {
    this.name = contributor.org_name;
    this.indivs = +contributor.indivs;
    this.pacs = +contributor.pacs;
    this.total = +contributor.total;
  }
}
