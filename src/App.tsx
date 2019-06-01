import React, { Component } from 'react';
import House from './components/House/House';
import Senate from './components/Senate/Senate';
import { CandidateModel } from './models/candidate.model';
import { Candidate } from './models/candidate';
import { compareByName, getPartyColorQuantile } from './utils';
import { Chamber } from './models/chamber.enum';
import { AppState } from './store';
import { connect } from 'react-redux';
import { Cycle } from './models/cycle.enum';
import CycleSelector from './components/CycleSelector/CycleSelector';
import SectorFilter from './components/SectorFilter/SectorFilter';
import IndustryFilter from './components/IndustryFilter/IndustryFilter';

import './App.scss';
import { Industry, Sector } from './store/filter/types';
import CandidateCard from './components/CandidateCard/CandidateCard';
import cycles from './data/candidate_list.json';
import candidateData from './data/candidate_data.json';
import './App.scss';
import { CandidateDataJson } from './types';
import CongressInfo from './components/CongressInfo/CongressInfo';

interface Props {
  cycle: Cycle;
  sector: string;
  industry: string | null;
}

const getTotal = (cid: string, cycle: Cycle, sector: Sector, industry: Industry): number => {
  const data: CandidateDataJson = candidateData;
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

    const houseDemocrats: CandidateModel[] = [];
    const houseRepublicans: CandidateModel[] = [];
    const houseIndependents: CandidateModel[] = [];
    const houseVacancies: CandidateModel[] = [];
    const senateDemocrats: CandidateModel[] = [];
    const senateRepublicans: CandidateModel[] = [];
    const senateIndependents: CandidateModel[] = [];
    const senateVacancies: CandidateModel[] = [];
    const paidCandidates: CandidateModel[] = [];

    const candidates: CandidateModel[] = Object.values(cycles[cycle])
      .map((c: Candidate) => {
        const filteredTotal = getTotal(c.cid, cycle, sector, industry);
        const total = getTotal(c.cid, cycle, 'total', null);

        if (filteredTotal > max) {
          max = filteredTotal;
        }

        const newCandidate = new CandidateModel(c, filteredTotal, total);

        if (filteredTotal !== 0) {
          paidCandidates.push(newCandidate)
        }

        return newCandidate;
      });

    const sortedCandidates = candidates.sort(compareByName);

    sortedCandidates.forEach((c) => {
      if (c.chamber === Chamber.House) {
        if (c.isDemocrat()) {
          houseDemocrats.push(c);
        } else if (c.isRepublican()) {
          houseRepublicans.push(c);
        } else if (c.isIndependent()) {
          houseIndependents.push(c);
        } else {
          houseVacancies.push(c);
        }

      } else {
        if (c.isDemocrat()) {
          senateDemocrats.push(c);
        } else if (c.isRepublican()) {
          senateRepublicans.push(c);
        } else if (c.isIndependent()) {
          senateIndependents.push(c);
        } else {
          senateVacancies.push(c);
        }
      }
    });

    const quantileColorScale = getPartyColorQuantile(paidCandidates);

    return (
      <div className="app">
        <div className="app__main">
          <div className="app__chambers">
            <House
              candidates={[...houseDemocrats, ...houseIndependents, ...houseVacancies, ...houseRepublicans]}
              colorScale={quantileColorScale}
            />
            <Senate
              candidates={[...senateRepublicans, ...senateIndependents, ...senateVacancies, ...senateDemocrats]}
              colorScale={quantileColorScale}
            />
          </div>
        </div>
        <CycleSelector />
        <div className="app__filters">
          <div className="app__filter">
            <h1>Monetary Influence in U.S. Politics</h1>
          </div>
          <CongressInfo
            nrOfHouseDemocrats={houseDemocrats.length}
            nrOfHouseIndependents={houseIndependents.length}
            nrOfHouseRepublicans={houseRepublicans.length}
            nrOfHouseVacancies={houseVacancies.length}
            nrOfSenateDemocrats={senateDemocrats.length}
            nrOfSenateIndependents={senateIndependents.length}
            nrOfSenateRepublicans={senateRepublicans.length}
            nrOfSenateVacancies={senateVacancies.length}
          />
          <SectorFilter />
          <IndustryFilter />
        </div>
        <CandidateCard />
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
