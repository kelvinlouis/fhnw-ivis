import React, { Component } from 'react';
import './House.scss';
import { CandidateModel } from '../../models/candidate.model';
import { coordinates } from './house-coordinates';
import Seat from '../Seat/Seat';
import { formatMoney, getPartyName } from '../../utils';
import { Party } from '../../models/party.enum';
import { Chamber } from '../../models/chamber.enum';
import { INITIAL_ANIMATION_DURATION } from '../../constants';
import { HighlightFilter } from '../../store/filter/types';
import { AppState } from '../../store';
import { connect } from 'react-redux';

interface Props {
  candidates: CandidateModel[];
  colorScale: (chamber: Chamber) => (candidate: CandidateModel) => string;
  highlight: HighlightFilter | null,
}

class House extends Component<Props> {
  private graph: SVGElement | null = null;
  private el: HTMLDivElement | null = null;

  componentDidUpdate(prevProps: Props): void {
    const { highlight } = this.props;
    const { highlight: prevHighlight } = prevProps;

    if (this.el == null) {
      return;
    }

    if (highlight != null) {
      if (highlight.chamber === Chamber.Senate) {
        this.el.classList.add('house--none');
      } else {
        this.el.classList.add(`house--only-${getPartyName(highlight.party).toLowerCase()}`);
      }
    } else {
      if (prevHighlight != null) {
        if (prevHighlight.chamber === Chamber.Senate) {
          this.el.classList.remove('house--none');
        } else {
          this.el.classList.remove(`house--only-${getPartyName(prevHighlight.party).toLowerCase()}`);
        }
      } else {
        this.el.classList.remove('house--none');
        this.el.classList.remove('house--only-democrat');
        this.el.classList.remove('house--only-republican');
        this.el.classList.remove('house--only-independent');
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.el!.classList.remove('house--initial-render');
    }, INITIAL_ANIMATION_DURATION);
  }

  render() {
    const { candidates, colorScale } = this.props;
    const total = candidates.reduce((agg, candidate) => agg + candidate.filteredTotal, 0);

    const totalDemocrats = candidates
      .filter(c => c.party === Party.Democrat)
      .reduce((agg, candidate) => agg + candidate.filteredTotal, 0);

    const totalRepublicans = candidates
      .filter(c => c.party === Party.Republican)
      .reduce((agg, candidate) => agg + candidate.filteredTotal, 0);

    const houseColorScale = colorScale(Chamber.House);

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
              r={3.64}
              colorScale={houseColorScale}
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

export default connect(mapStateToProps)(House);
