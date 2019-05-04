import React, { Component } from 'react';
import { CandidateModel } from '../../models/candidate.model';
import { getPartyBorderColor, getPartyColor } from '../../utils';
import * as d3 from 'd3';

interface Props {
  candidate: CandidateModel;
  max: number;
  cx: string;
  cy: string;
  r: string;
}

export class Seat extends Component<Props> {
  render() {
    const { cx, cy, r, candidate, max } = this.props;
    const color = getPartyColor(candidate, max)!;
    const darker = d3.color(color)!.darker(1);
    const border = darker.toString();

    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
        stroke={border}
        strokeWidth={0.6}
      />
    );
  }
}
