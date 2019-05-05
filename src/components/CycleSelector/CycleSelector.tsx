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
    <h3 className="title">Cycle</h3>
    <div className="field has-addons">
      <p className="control">
        <button onClick={() => onCycleClick(Cycle.Year2014)} className={`button is-light ${cycle === Cycle.Year2014 ? 'is-active' : ''}`}>
          <span>2014</span>
        </button>
      </p>
      <p className="control">
        <button onClick={() => onCycleClick(Cycle.Year2016)} className={`button is-light ${cycle === Cycle.Year2016 ? 'is-active' : ''}`}>
          <span>2016</span>
        </button>
      </p>
      <p className="control">
        <button onClick={() => onCycleClick(Cycle.Year2018)} className={`button is-light ${cycle === Cycle.Year2018 ? 'is-active' : ''}`}>
          <span>2018</span>
        </button>
      </p>
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
