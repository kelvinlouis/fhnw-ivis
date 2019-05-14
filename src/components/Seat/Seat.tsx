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
  onClick?: (candidate: CandidateModel) => void;
}

class Seat extends Component<Props> {
  private el: SVGElement | null = null;

  componentDidMount() {
    if (this.el != null) {
      // Remove the classes responsible for the animation
      this.el.addEventListener('animationend', () => {
        this.el!.classList.remove('animation--zoom-in');
        this.el!.classList.add('seat--filled');
      });

      // Start animation
      this.el.classList.add('animation--zoom-in');
    }
  }

  render() {
    const { cx, cy, candidate, max, onClick } = this.props;
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
          fill={color}
          stroke={border}
          strokeWidth={0.6}
          className={className}
          onClick={() => onClick != null ? onClick(candidate) : () => {}}
          ref={el => (this.el = el)}
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
