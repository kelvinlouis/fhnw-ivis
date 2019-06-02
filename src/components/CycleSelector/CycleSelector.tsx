import React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { Cycle } from '../../models/cycle.enum';
import { setCycle } from '../../store/filter/actions';
import './CycleSelector.scss';

interface Props {
  cycle: Cycle,
  onCycleClick: (cycle: Cycle) => void,
}

const CycleSelector: React.FC<Props> = ({ cycle, onCycleClick }) => (
  <div className="cycle-selector">
    <div onClick={() => onCycleClick(Cycle.Year2020)} className={`cycle-selector__cycle${cycle === Cycle.Year2020 ? ' cycle-selector__cycle---active' : ''}`}>
    <span className="cycle-selector__cycle-label">2019</span>
    </div>
    <div onClick={() => onCycleClick(Cycle.Year2018)} className={`cycle-selector__cycle${cycle === Cycle.Year2018 ? ' cycle-selector__cycle---active' : ''}`}>
      <span className="cycle-selector__cycle-label">2017</span>
    </div>
    <div onClick={() => onCycleClick(Cycle.Year2016)} className={`cycle-selector__cycle${cycle === Cycle.Year2016 ? ' cycle-selector__cycle---active' : ''}`}>
      <span className="cycle-selector__cycle-label">2015</span>
    </div>
    <div onClick={() => onCycleClick(Cycle.Year2014)} className={`cycle-selector__cycle${cycle === Cycle.Year2014 ? ' cycle-selector__cycle---active' : ''}`}>
      <span className="cycle-selector__cycle-label">2013</span>
    </div>
    <div onClick={() => onCycleClick(Cycle.Year2012)} className={`cycle-selector__cycle${cycle === Cycle.Year2012 ? ' cycle-selector__cycle---active' : ''}`}>
    <span className="cycle-selector__cycle-label">2011</span>
    </div>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  cycle: state.filter.cycle,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCycleClick: (cycle: Cycle) => dispatch(setCycle(cycle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CycleSelector);
