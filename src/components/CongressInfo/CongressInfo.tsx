import React from 'react';
import { connect } from 'react-redux';
import { Cycle } from '../../models/cycle.enum';
import { AppState } from '../../store';
import './CongressInfo.scss';
import { setHighlight } from '../../store/filter/actions';
import { Chamber } from '../../models/chamber.enum';
import { Party } from '../../models/party.enum';
import { HighlightFilter } from '../../store/filter/types';
import { getCongressName } from '../../utils';

interface Props {
  cycle: Cycle;
  nrOfHouseDemocrats: number;
  nrOfHouseIndependents: number;
  nrOfHouseRepublicans: number;
  nrOfHouseVacancies: number;
  nrOfSenateDemocrats: number;
  nrOfSenateIndependents: number;
  nrOfSenateRepublicans: number;
  nrOfSenateVacancies: number;
  onHighlight: (highlight: HighlightFilter | null) => void,
}

class CongressInfo extends React.Component<Props> {
  public onMouseOver(chamber: Chamber, party: Party): void {
    this.props.onHighlight({
      chamber,
      party,
    });
  }

  public onMouseLeave(): void {
    this.props.onHighlight(null);
  }

  public render() {
    const {
      cycle,
      nrOfHouseDemocrats,
      nrOfHouseIndependents,
      nrOfHouseRepublicans,
      nrOfHouseVacancies,
      nrOfSenateDemocrats,
      nrOfSenateIndependents,
      nrOfSenateRepublicans,
      nrOfSenateVacancies,
    } = this.props;

    return (
      <div className="app__filter app__filter--congress-info">
        <p>
          The <strong>{getCongressName(cycle)}</strong> is made up of two chambers.
        </p>
        <p>
          There are <strong>435 representatives</strong> in the house:&nbsp;
          <span
            onMouseLeave={() => this.onMouseLeave()}
            onMouseEnter={() => this.onMouseOver(Chamber.House, Party.Democrat)}
            className="congress-info__highlighter congress-info__highlighter--democrat"
          >
          {nrOfHouseDemocrats} democrats
        </span>
          ,&nbsp;
          <span
            onMouseLeave={() => nrOfHouseIndependents > 0 ? this.onMouseLeave() : () => {}}
            onMouseEnter={() => nrOfHouseIndependents > 0 ? this.onMouseOver(Chamber.House, Party.Independent) : () => {}}
            className="congress-info__highlighter congress-info__highlighter--independent"
          >
          {nrOfHouseIndependents} {nrOfHouseIndependents === 1 ? 'independent' : 'independents'}
        </span>
          <span>,&nbsp;</span>
          <span
            onMouseLeave={() => this.onMouseLeave()}
            onMouseEnter={() => this.onMouseOver(Chamber.House, Party.Republican)}
            className="congress-info__highlighter congress-info__highlighter--republican"
          >
            {nrOfHouseRepublicans} republicans
          </span>
          &nbsp;and&nbsp;
          {nrOfHouseVacancies} {nrOfHouseVacancies === 1 ? 'vacancy' : 'vacancies'}.
        </p>
        <p>
          The senate has <strong>100 senators</strong>:&nbsp;
          <span
            onMouseLeave={() => this.onMouseLeave()}
            onMouseEnter={() => this.onMouseOver(Chamber.Senate, Party.Democrat)}
            className="congress-info__highlighter congress-info__highlighter--democrat"
          >
            {nrOfSenateDemocrats} democrats
          </span>
          ,&nbsp;
          <span
            onMouseLeave={() => nrOfSenateIndependents > 0 ? this.onMouseLeave() : () => {}}
            onMouseEnter={() => nrOfSenateIndependents > 0 ? this.onMouseOver(Chamber.Senate, Party.Independent) : () => {}}
            className="congress-info__highlighter congress-info__highlighter--independent"
          >
            {nrOfSenateIndependents} {nrOfSenateIndependents === 1 ? 'independent' : 'independents'}
          </span>
          ,&nbsp;
          <span
            onMouseLeave={() => this.onMouseLeave()}
            onMouseEnter={() => this.onMouseOver(Chamber.Senate, Party.Republican)}
            className="congress-info__highlighter congress-info__highlighter--republican"
          >
            {nrOfSenateRepublicans} republicans
          </span>
          and&nbsp;
          {nrOfSenateVacancies} {nrOfSenateVacancies === 1 ? 'vacancy' : 'vacancies'}.
        </p>
        <p>
          Every election cycle candidates of both chambers receive contributions.&nbsp;
          They either come from individuals or political action committees (PACs).
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cycle: state.filter.cycle,
});

const mapDispatchToProps = (dispatch: any) => ({
  onHighlight: (highlight: HighlightFilter | null) => dispatch(setHighlight(highlight)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CongressInfo);
