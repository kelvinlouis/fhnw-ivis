import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CandidateModel } from '../../models/candidate.model';
import { formatDate, formatMoney } from '../../utils';
import states from '../../data/states.json';
import './CandidateCard.scss';
import { AppState } from '../../store';
import { setSelectedCandidate } from '../../store/candidate/actions';
import { SectorMap } from '../SectorMap/SectorMap';
import { StatesMapJson } from '../../types';

interface Props {
  candidate: CandidateModel | null;
  onClose: () => void;
}

class CandidateCard extends Component<Props> {
  constructor(props: Props){
    super(props);
  }

  onEsc = (event: KeyboardEvent): void => {
    const { onClose } = this.props;
    if(event.keyCode === 27) {
      onClose();
    }
  };

  componentDidMount(){
    document.addEventListener('keydown', this.onEsc, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onEsc, false);
  }

  render() {
    const { candidate, onClose } = this.props;

    if (candidate == null) {
      return <div />;
    }

    const { cid, partyName, fullName, state, birthday, age, bioid, office, cycle, total, contributors } = candidate;
    const stateMap: StatesMapJson = states;

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={() => onClose()} />
        <div className="modal-content">
          <div className="card">
            <div className={`card-ribbon card-ribbon--${partyName.toLowerCase()}`} />
            <div className="card-content">
              <article className="media">
                <figure className="media-left">
                  <div className="card-image-wrapper">
                    <a href={`http://bioguide.congress.gov/scripts/biodisplay.pl?index=${bioid}`} target="_blank">
                      <img src={`pictures/${cid}.jpg`} alt={fullName} />
                    </a>
                  </div>
                </figure>
                <div className="media-content">
                  <h2 className="card-title">
                    <a href={`http://bioguide.congress.gov/scripts/biodisplay.pl?index=${bioid}`} target="_blank">
                      {fullName} <span className="card-title__sub">({cycle})</span>
                    </a>
                  </h2>
                  <p className="card-info">{formatDate(birthday)} ({age} years old)</p>
                  <p className="card-info">{partyName}</p>
                  <p className="card-info">{office}</p>
                  <p className="card-info">{stateMap[state]} ({state})</p>
                  <p className="card-info">Total received: <strong>{formatMoney(total)}</strong></p>
                </div>
              </article>
            </div>
            <div className="candidate__contributors">
              <h4>Top Contributors</h4>
              <nav className="level">
                {contributors.map(contributor => (
                  <div className="level-item has-text-centered" key={contributor.name}>
                    <div>
                      <p className="heading">{contributor.name}</p>
                      <p className="title">{formatMoney(contributor.total)}</p>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
            <SectorMap candidate={candidate} />
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => onClose()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  candidate: state.candidate.selected,
});

const mapDispatchToProps = (dispatch: any) => ({
  onClose: () => dispatch(setSelectedCandidate(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCard);
