import React, { Component } from 'react';
import './Senate.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './senate-coordinates';
import Seat from '../Seat/Seat';
import { formatMoney, getPartyName } from '../../utils';
import { Party } from '../../models/party.enum';
import { Chamber } from '../../models/chamber.enum';
import { INITIAL_ANIMATION_DURATION } from '../../constants';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { HighlightFilter } from '../../store/filter/types';

interface Props {
  candidates: CandidateModel[];
  colorScale: (chamber: Chamber) => (candidate: CandidateModel) => string;
  highlight: HighlightFilter | null;
}

class Senate extends Component<Props> {
  private graph: SVGElement | null = null;
  private el: HTMLDivElement | null = null;

  componentDidUpdate(prevProps: Props): void {
    const { highlight } = this.props;
    const { highlight: prevHighlight } = prevProps;

    if (this.el == null) {
      return;
    }

    if (highlight != null) {
      if (highlight.chamber === Chamber.House) {
        this.el.classList.add('senate--none');
      } else {
        this.el.classList.add(`senate--only-${getPartyName(highlight.party).toLowerCase()}`);
      }
    } else {
      if (prevHighlight != null) {
        if (prevHighlight.chamber === Chamber.House) {
          this.el.classList.remove('senate--none');
        } else {
          this.el.classList.remove(`senate--only-${getPartyName(prevHighlight.party).toLowerCase()}`);
        }
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.el!.classList.remove('senate--initial-render');
    }, INITIAL_ANIMATION_DURATION);
  }

  render() {
    const { candidates, colorScale } = this.props;
    const total = candidates.reduce((agg, candidate) => agg + candidate.total, 0);

    const totalDemocrats = candidates
      .filter(c => c.party === Party.Democrat)
      .reduce((agg, candidate) => agg + candidate.total, 0);

    const totalRepublicans = candidates
      .filter(c => c.party === Party.Republican)
      .reduce((agg, candidate) => agg + candidate.total, 0);

    const senateColorScale = colorScale(Chamber.Senate)

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
              colorScale={senateColorScale}
              candidate={c}
              {...coordinates[index]}
            />
          ))}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  highlight: state.filter.highlight,
});

export default connect(mapStateToProps)(Senate);
