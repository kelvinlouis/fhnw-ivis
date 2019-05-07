import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CandidateModel } from '../../models/candidate.model';
import { calculateAge, formatDate, getFunctionName, getPartyName } from '../../utils';
import states from '../../data/states.json';
import './CandidateCard.scss';
import { AppState } from '../../store';
import { setSelectedCandidate } from '../../store/candidate/actions';
import { SectorMap } from '../SectorMap/SectorMap';
import { StatesMapJson } from '../../data/types';

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

    const { cid, party, fullName, state, birthday, bioid, chamber, cycle } = candidate;
    const stateMap: StatesMapJson = states;

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={() => onClose()} />
        <div className="modal-content">
          <div className="card">
            <div className={`card-ribbon card-ribbon--${getPartyName(party).toLowerCase()}`} />
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
                      {fullName}
                    </a>
                  </h2>
                  <p className="card-info">{formatDate(birthday)} ({calculateAge(birthday)} years old)</p>
                  <p className="card-info">{getPartyName(party)}</p>
                  <p className="card-info">{getFunctionName(chamber)}, {cycle}</p>
                  <p className="card-info">{stateMap[state]} ({state})</p>
                </div>
              </article>
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
