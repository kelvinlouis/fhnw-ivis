import React, { Component } from 'react';
import { House } from './components/House/House';
import { Senate } from './components/Senate/Senate';
<<<<<<< HEAD
import cycles from './data/candidate_list.json';
=======
import { IndustryFilter } from './components/IndustryFilter/IndustryFilter';
>>>>>>> remotes/origin/develop
import { CandidateModel } from './models/candidate.model';
import { Candidate } from './models/candidate';
import { compareByName } from './utils';
import { Chamber } from './models/chamber.enum';
import { Party } from './models/party.enum';
import { AppState } from './store';
import { connect } from 'react-redux';
import { Cycle } from './models/cycle.enum';
import CycleSelector from './components/CycleSelector/CycleSelector';
import SectorFilter from './components/SectorFilter/SectorFilter';
import IndustryFilter from './components/IndustryFilter/IndustryFilter';

import './App.scss';
import cycles from './data/candidate_list.json';
import candidateData from './data/candidate_data.json';
import { Industry, Sector } from './store/filter/types';

interface Props {
  cycle: Cycle;
  sector: string;
  industry: string | null;
}

/**
 * Nested object containing the total contributions per sector and industry
 */
interface CandidateData {
  [cycle: string]: {
    [cid: string]: {
      [key: string]: number
    }
  }
}

const getTotal = (cid: string, cycle: Cycle, sector: Sector, industry: Industry): number => {
  const data: CandidateData = candidateData;
  const candidate = data[cycle][cid];

  if (candidate == null) {
    return 0;
  }

  if (industry != null) {
    return candidate[industry] || 0;
  } else {
    return candidate[sector] || 0;
  }
};

class App extends Component<Props> {
  render() {
    const { cycle, sector, industry } = this.props;
    let max: number = 0;

    const houseDemocracts: CandidateModel[] = [];
    const houseOthers: CandidateModel[] = [];
    const houseRepublicans: CandidateModel[] = [];
    const senateDemocracts: CandidateModel[] = [];
    const senateOthers: CandidateModel[] = [];
    const senateRepublicans: CandidateModel[] = [];

    const candidates: CandidateModel[] = Object.values(cycles[cycle])
      .map((c: Candidate) => {
        const total = getTotal(c.cid, cycle, sector, industry);

        if (total > max) {
          max = total;
        }

        return new CandidateModel(c, total);
      });

    const sortedCandidates = candidates.sort(compareByName);

    sortedCandidates.forEach((c) => {
      if (c.chamber === Chamber.House) {
        if (c.party === Party.Democrat) {
          houseDemocracts.push(c);
        } else if (c.party === Party.Republican) {
          houseRepublicans.push(c);
        } else {
          houseOthers.push(c);
        }
      } else {
        if (c.party === Party.Democrat) {
          senateDemocracts.push(c);
        } else if (c.party === Party.Republican) {
          senateRepublicans.push(c);
        } else {
          senateOthers.push(c);
        }
      }
    });

    return (
      <div className="app">
        <div className="app__chambers">
          <House
            max={max}
            candidates={[...houseDemocracts, ...houseOthers, ...houseRepublicans]}
          />
          <Senate
            max={max}
            candidates={[...senateRepublicans, ...senateOthers, ...senateDemocracts]}
          />
        </div>
        <div className="app__filters">
          <CycleSelector />
          <SectorFilter />
          <IndustryFilter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cycle: state.filter.cycle,
  sector: state.filter.sector,
  industry: state.filter.industry,
});

export default connect(mapStateToProps)(App);
