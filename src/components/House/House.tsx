import React, { Component } from 'react';
import './House.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './house-coordinates';
import { Seat } from '../Seat/Seat';
import { formatMoney } from '../../utils';

interface Props {
  max: number;
  candidates: CandidateModel[];
}

export class House extends Component<Props> {
  private graph: SVGElement | null;

  constructor(props: Props) {
    super(props);

    // Reference to svg element
    this.graph = null;
  }

  componentDidMount() {}

  render() {
    const { candidates, max } = this.props;
    const total = candidates.reduce((agg, candidate) => agg + candidate.total, 0);

    return (
      <div className="house">
        <div className="house__title">House</div>
        <div className="house__total">{formatMoney(total)}</div>
        <svg className="house__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
          {candidates.map((c, index) => (
            <Seat
              key={c.cid}
              max={max}
              candidate={c}
              {...coordinates[index]}
              r="3.64"
            />
          ))}
        </svg>
      </div>
    );
  }
}
