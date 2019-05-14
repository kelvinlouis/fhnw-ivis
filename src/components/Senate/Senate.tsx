import React, { Component } from 'react';
import './Senate.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './senate-coordinates';
import Seat from '../Seat/Seat';
import { formatMoney } from '../../utils';
import { Party } from '../../models/party.enum';
import { INITIAL_ANIMATION_DURATION } from '../../constants';

interface Props {
  max: number;
  candidates: CandidateModel[];
}

export class Senate extends Component<Props> {
  private graph: SVGElement | null = null;
  private el: HTMLDivElement | null = null;

  componentDidMount() {
    setTimeout(() => {
      this.el!.classList.remove('senate--initial-render');
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
      <div className="senate senate--initial-render" ref={el => (this.el = el)}>
        <div className="senate__title">Senate</div>
        <div className="senate__total">{formatMoney(total)}</div>
        <div className="senate__party senate__party--democrats">
          <span className="senate__party-title">Democrats</span>
          <span className="senate__party-total">{formatMoney(totalDemocrats)}</span>
        </div>
        <div className="senate__party senate__party--republicans">
          <span className="senate__party-title">Republicans</span>
          <span className="senate__party-total">{formatMoney(totalRepublicans)}</span>
        </div>
        <svg className="senate__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
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
