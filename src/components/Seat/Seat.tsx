import React, { Component } from 'react';
import { CandidateModel } from '../../models/candidate.model';
import { getPartyColor } from '../../utils';

interface Props {
  candidate: CandidateModel;
  cx: string;
  cy: string;
  r: string;
}

export class Seat extends Component<Props> {
  render() {
    const { cx, cy, r, candidate } = this.props;

    return <circle cx={cx} cy={cy} r={r} fill={getPartyColor(candidate)} />;
  }
}
