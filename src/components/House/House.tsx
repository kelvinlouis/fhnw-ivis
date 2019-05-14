import React, { Component } from 'react';
import './House.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './house-coordinates';
import Seat from '../Seat/Seat';
import { formatMoney } from '../../utils';
import { Party } from '../../models/party.enum';
import { INITIAL_ANIMATION_DURATION } from '../../constants';

interface Props {
  max: number;
  candidates: CandidateModel[];
}

export class House extends Component<Props> {
  private graph: SVGElement | null = null;
  private el: HTMLDivElement | null = null;

  componentDidMount() {
    setTimeout(() => {
      this.el!.classList.remove('house--initial-render');
    }, INITIAL_ANIMATION_DURATION);
  }

  render() {
    const { candidates, max } = this.props;
    const total = candidates.reduce((agg, candidate) => agg + candidate.total, 0);

    const totalDemocrats = candidates
      .filter(c => c.party === Party.Democrat)
      .reduce((agg, candidate) => agg + candidate.total, 0);

    const totalRepublicans = candidates
      .filter(c => c.party === Party.Republican)
      .reduce((agg, candidate) => agg + candidate.total, 0);

    return (
      <div className="house house--initial-render" ref={el => (this.el = el)}>
        <div className="house__title">House</div>
        <div className="house__total">{formatMoney(total)}</div>
        <div className="house__party house__party--democrats">
          <span className="house__party-title">Democrats</span>
          <span className="house__party-total">{formatMoney(totalDemocrats)}</span>
        </div>
        <div className="house__party house__party--republicans">
          <span className="house__party-title">Republicans</span>
          <span className="house__party-total">{formatMoney(totalRepublicans)}</span>
        </div>
        <svg className="house__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
          {candidates.map((c, index) => (
            <Seat
              key={c.cid}
              max={max}
              candidate={c}
              {...coordinates[index]}
            />
          ))}
        </svg>
      </div>
    );
  }
}
