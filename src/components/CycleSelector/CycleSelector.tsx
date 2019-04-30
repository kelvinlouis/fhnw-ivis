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
    <span>Active: {cycle}</span>
    <button onClick={() => onCycleClick(Cycle.Year2014)}>2014</button>
    <button onClick={() => onCycleClick(Cycle.Year2016)}>2016</button>
    <button onClick={() => onCycleClick(Cycle.Year2018)}>2018</button>
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
