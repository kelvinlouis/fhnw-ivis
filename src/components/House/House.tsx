import React, { Component } from 'react';
import './House.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './house-coordinates';
import { Seat } from '../Seat/Seat';

interface Props {
  candidates: CandidateModel[];
}

export class House extends Component<Props> {
  private graph: SVGElement | null;

  constructor(props: Props) {
    super(props);

    // Reference to svg element
    this.graph = null;
  }

  componentDidMount() {
  }

  render() {
    const { candidates } = this.props;

    console.log('House', candidates.length);

    return (
      <div className="house">
        <svg className="house__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
          {candidates.map((c, index) => (
            <Seat key={c.cid} candidate={c} {...coordinates[index]} r="3.64" />
          ))}
        </svg>
      </div>
    );
  }
}
