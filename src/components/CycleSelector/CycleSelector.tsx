import React from 'react';
import { AppState } from '../../store';
import { Cycle } from '../../models/cycle.enum';
import { setCycle } from '../../store/filter/actions';
import { connect } from 'react-redux';

interface Props {
  cycle: Cycle,
  onCycleClick: (cycle: Cycle) => void,
}

const CycleSelector: React.FC<Props> = ({ cycle, onCycleClick }) => (
  <div>
    <h3>Cycle</h3>
    <div className="btn-group" role="group" aria-label="Cycle">
      <button
        onClick={() => onCycleClick(Cycle.Year2014)}
        type="button"
        className={`btn btn-secondary ${cycle === Cycle.Year2014 ? 'active' : ''}`}
      >
        2014
      </button>
      <button
        onClick={() => onCycleClick(Cycle.Year2016)}
        type="button"
        className={`btn btn-secondary ${cycle === Cycle.Year2016 ? 'active' : ''}`}
      >
        2016
      </button><button
      onClick={() => onCycleClick(Cycle.Year2018)}
      type="button"
      className={`btn btn-secondary ${cycle === Cycle.Year2018 ? 'active' : ''}`}
    >
      2018
    </button>
    </div>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  cycle: state.filter.cycle,
});

// Todo find state!
const mapDispatchToProps = (dispatch: any) => ({
  onCycleClick: (cycle: Cycle) => dispatch(setCycle(cycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CycleSelector);
