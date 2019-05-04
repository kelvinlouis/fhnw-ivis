import React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import Select from 'react-select/lib/Select';
import { ValueType } from 'react-select/lib/types';
import industries from '../../data/industry_map.json';
import { setIndustry } from '../../store/filter/actions';

interface Props {
  selectedIndustry: string | null;
  onChange: (industry: string) => void,
}

type OptionType = { label: string; value: string };

const options: OptionType[] = Object
  .entries(industries)
  .map(([ value, label ]) => ({
    label,
    value,
  }));

const IndustryFilter: React.FC<Props> = ({ selectedIndustry, onChange }) => {
  const selectedOption: OptionType = options.find( o => o.value === selectedIndustry)!;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option: ValueType<OptionType>)  => onChange((option as OptionType).value)}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedIndustry: state.filter.industry,
});

const mapDispatchToProps = (dispatch: any) => ({
  onChange: (industry: string) => dispatch(setIndustry(industry))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndustryFilter)
