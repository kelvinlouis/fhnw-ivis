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
import { debounce } from 'ts-debounce';

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
  public onMouseOver: any;

  constructor(props: Props) {
    super(props);

    this.onMouseOver = debounce((chamber: Chamber, party: Party) => {
      this.props.onHighlight({
        chamber,
        party,
      });
    }, 400, { isImmediate: true });
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
          The <strong>{getCongressName(cycle)}</strong> is made up of two chambers: house and senate.
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
          ,
          <span
            onMouseLeave={() => nrOfHouseIndependents > 0 ? this.onMouseLeave() : () => {}}
            onMouseEnter={() => nrOfHouseIndependents > 0 ? this.onMouseOver(Chamber.House, Party.Independent) : () => {}}
            className="congress-info__highlighter congress-info__highlighter--independent"
          >
            {nrOfHouseIndependents} {nrOfHouseIndependents === 1 ? 'independent' : 'independents'}
          </span>
          <span
            onMouseLeave={() => this.onMouseLeave()}
            onMouseEnter={() => this.onMouseOver(Chamber.House, Party.Republican)}
            className="congress-info__highlighter congress-info__highlighter--republican"
          >
            {nrOfHouseRepublicans} republicans
          </span>
          and&nbsp;
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
          ,
          <span
            onMouseLeave={() => nrOfSenateIndependents > 0 ? this.onMouseLeave() : () => {}}
            onMouseEnter={() => nrOfSenateIndependents > 0 ? this.onMouseOver(Chamber.Senate, Party.Independent) : () => {}}
            className="congress-info__highlighter congress-info__highlighter--independent"
          >
            {nrOfSenateIndependents} {nrOfSenateIndependents === 1 ? 'independent' : 'independents'}
          </span>
          ,
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
          Every election cycle candidates of both chambers receive contributions. They either come from individuals or political action committees (PACs).
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
