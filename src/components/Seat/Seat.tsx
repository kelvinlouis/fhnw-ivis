import React, { Component } from 'react';
import Tippy from '@tippy.js/react'
import * as d3 from 'd3';
import { CandidateModel } from '../../models/candidate.model';
import { formatMoney, getPartyColor } from '../../utils';
import { Party } from '../../models/party.enum';
import './Seat.scss';
import { setSelectedCandidate } from '../../store/candidate/actions';
import { connect } from 'react-redux';
import { AppState } from '../../store';


interface Props {
  candidate: CandidateModel;
  max: number;
  cx: string;
  cy: string;
  r: string;
  onClick?: (candidate: CandidateModel) => void;
}

class Seat extends Component<Props> {
  render() {
    const { cx, cy, r, candidate, max, onClick } = this.props;
    const color = getPartyColor(candidate, max)!;
    const darker = d3.color(color)!.darker(1);
    const border = darker.toString();
    const isVacant = candidate.party === Party.Vacant;
    const className = `seat ${!isVacant ? 'seat--active' : ''}`;

    const tooltip = (
      <span>
        <span><strong>{candidate.fullName}</strong></span>
        <span className="seat__money">{formatMoney(candidate.total)}</span>
      </span>
    );

    return (
      <Tippy content={tooltip} isEnabled={!isVacant} delay={200}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={color}
          stroke={border}
          strokeWidth={0.6}
          className={className}
          onClick={() => onClick != null ? onClick(candidate) : () => {}}
        />
      </Tippy>
    );
  }
}

const mapStateToProps = (state: AppState, props: Props) => ({
  ...props,
});

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (candidate: CandidateModel) => dispatch(setSelectedCandidate(candidate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
