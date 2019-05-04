import React from 'react';
import Select from 'react-select';
import sectors from '../../data/sector_map.json';
import { AppState } from '../../store';
import { setSector } from '../../store/filter/actions';
import { connect } from 'react-redux';
import { ValueType } from 'react-select/lib/types';
import { Sector } from '../../store/filter/types';

interface Props {
  selectedSector: Sector;
  onChange: (sector: Sector) => void,
}

type OptionType = { label: string; value: string };

const allOption: OptionType = { label: 'All', value: 'total' };
const options: OptionType[] = [
  allOption,
  ...Object
    .entries(sectors)
    .map(([ value, label ]) => ({
      label,
      value,
    }))
];

const SectorFilter: React.FC<Props> = ({ selectedSector, onChange }) => {
  const selectedOption: OptionType = options.find( o => o.value === selectedSector)!;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option: ValueType<OptionType>)  => onChange((option as OptionType).value)}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedSector: state.filter.sector,
});

const mapDispatchToProps = (dispatch: any) => ({
  onChange: (sector: Sector) => dispatch(setSector(sector))
});

export default connect(mapStateToProps, mapDispatchToProps)(SectorFilter)
