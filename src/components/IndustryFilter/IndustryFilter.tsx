import React, { Component } from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import industryMap from '../../data/industry_map.json';
import industryList from '../../data/industry_list.json'
import { setIndustry } from '../../store/filter/actions';
import * as d3 from "d3";
import { Cycle } from '../../models/cycle.enum';

interface Props {
  selectedCycle: Cycle;
  selectedSector: string;
  selectedIndustry: string | null;
  onChange: (industry: string) => void,
}

interface IndustryData {
  [cycle: string]: {
    [sector: string]: {
      [industry: string]: number;
    }
  }
}

interface IndustryMap {
  [industry: string]: string;
}

interface IndustryDataEntry {
  industry: string;
  value: number;
}

class IndustryFilter extends Component<Props> {
  private graph: SVGElement | null;

  constructor(props: Props) {
    super(props);

    // Reference to svg element
    this.graph = null;
  }

  componentDidUpdate() {
    const { selectedCycle, selectedSector, selectedIndustry, onChange } = this.props;

    const data: IndustryData = industryList;
    const label: IndustryMap = industryMap;

    const chartData = data[selectedCycle][selectedSector];
    const chartDataArray: IndustryDataEntry[] = Object.keys(chartData).map(k => ({ industry: label[k], value: chartData[k] }));
    const maxMoney = Object.keys(chartData).reduce((m, k) => { return k === 'total' ? m : chartData[k] > m ? chartData[k] : m }, -Infinity);

    const svg = d3.select(this.graph);

    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 500 500`)

    const margin = {top: 10, right: 10, bottom: 30, left: 160};
    const width = 500 - (margin.left + margin.right);
    const height = 500 - (margin.top + margin.bottom);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .range([0, width])
      .domain([maxMoney, 0])
      .nice();

    const yScale = d3.scaleBand()
      .range([0, height])
      .domain(chartDataArray.map(i => i.industry))
      .padding(0.4);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3.axisBottom(xScale)
          .tickFormat(d3.format('.2s'))
        );

    chart.append('g')
      .call(d3.axisLeft(yScale));

    const barGroups = chart.selectAll()
      .data(chartDataArray)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', g => xScale(g.value))
      .attr('y', g => yScale(g.industry)!)
      .attr('height', yScale.bandwidth())
      .attr('width', g => width - xScale(g.value))
  }

  render() {
    return (
      <div className='bar-chart'>
        <svg ref={svg => this.graph = svg} />
      </div>
    );
  };
};

const mapStateToProps = (state: AppState) => ({
  selectedCycle: state.filter.cycle,
  selectedSector: state.filter.sector,
  selectedIndustry: state.filter.industry,
});

const mapDispatchToProps = (dispatch: any) => ({
  onChange: (industry: string) => dispatch(setIndustry(industry))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndustryFilter)
