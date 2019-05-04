import React, { Component } from 'react';
import './Senate.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './senate-coordinates';
import { Seat } from '../Seat/Seat';

interface Props {
  max: number;
  candidates: CandidateModel[];
}

export class Senate extends Component<Props> {
  private graph: SVGElement | null;

  constructor(props: Props) {
    super(props);

    // Reference to svg element
    this.graph = null;
  }

  componentDidMount() {}

  render() {
    const { candidates, max } = this.props;

    return (
      <div className="senate">
        <svg className="senate__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
          {candidates.map((c, index) => (
            <Seat
              key={c.cid}
              max={max}
              candidate={c}
              {...coordinates[index]}
              r="6.67"
            />
          ))}
        </svg>
      </div>
    );
  }
}
