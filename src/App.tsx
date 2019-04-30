import React, { Component } from 'react';
import './App.scss';
import { House } from './components/House/House';
import { Senate } from './components/Senate/Senate';
import { IndustryFilter } from './components/IndustryFilter/IndustryFilter';
import cycles from './data/candidate_list.json';
import { CandidateModel } from './models/candidate.model';
import { Candidate } from './models/candidate';
import { compareByName } from './utils';
import { Chamber } from './models/chamber.enum';
import { Party } from './models/party.enum';
import { AppState } from './store';
import { connect } from 'react-redux';
import { Cycle } from './models/cycle.enum';
import CycleSelector from './components/CycleSelector/CycleSelector';

interface Props {
  cycle: Cycle;
}

class App extends Component<Props> {
  render() {
    const { cycle } = this.props;

    const houseDemocracts: CandidateModel[] = [];
    const houseIndependents: CandidateModel[] = [];
    const houseRepublicans: CandidateModel[] = [];
    const senateDemocracts: CandidateModel[] = [];
    const senateIndependents: CandidateModel[] = [];
    const senateRepublicans: CandidateModel[] = [];

    const candidates: CandidateModel[] = Object.values(cycles[cycle])
      .map((c: Candidate) => new CandidateModel(c));

    const sortedCandidates = candidates.sort(compareByName);

    sortedCandidates.forEach((c) => {
      if (c.chamber === Chamber.House) {
        if (c.party === Party.Democrat) {
          houseDemocracts.push(c);
        } else if (c.party === Party.Republican) {
          houseRepublicans.push(c);
        } else {
          houseIndependents.push(c);
        }
      } else {
        if (c.party === Party.Democrat) {
          senateDemocracts.push(c);
        } else if (c.party === Party.Republican) {
          senateRepublicans.push(c);
        } else {
          senateIndependents.push(c);
        }
      }
    });

    return (
      <div className="app">
        <House candidates={[...houseDemocracts, ...houseIndependents, ...houseRepublicans]} />
        <Senate candidates={[...senateRepublicans, ...senateIndependents, ...senateDemocracts]}  />
        <div className="app__filters">
          <CycleSelector />
          <IndustryFilter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cycle: state.filter.cycle,
});

export default connect(mapStateToProps)(App);
