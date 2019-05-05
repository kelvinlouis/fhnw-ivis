import React, { Component } from 'react';
import { AppState } from '../store';
import { setSelectedCandidate } from '../store/candidate/actions';
import { connect } from 'react-redux';
import { CandidateModel } from '../models/candidate.model';

interface Props {
  candidate: CandidateModel | null;
  onClose: () => void;
}

class CandidateCard extends Component<Props> {
  render() {
    const { candidate, onClose } = this.props;

    if (candidate == null) {
      return <div />;
    }

    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <p className="title">
                {candidate.fullName}
              </p>
            </div>
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
