import React, { Component } from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import industryMap from '../../data/industry_map.json';
import industryList from '../../data/industry_list.json'
import { setIndustry } from '../../store/filter/actions';
import * as d3 from 'd3';
import { Cycle } from '../../models/cycle.enum';
import './IndustryFilter.scss';

interface Props {
  selectedCycle: Cycle;
  selectedSector: string;
  selectedIndustry: string | null;
  onChange: (industry: string | null) => void,
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

  componentDidMount() {
    this.drawBarChart();
  }

  componentDidUpdate() {
    this.drawBarChart();
  }

  wrapChartLabel(text: d3.Selection<d3.BaseType, {}, SVGGElement, {}>, width: number): void {
    // Source: https://bl.ocks.org/mbostock/7555321
    text.each(function () {
      const text = d3.select(this),
        words = text.text().split(/\s+|\//).reverse(),
        lineHeight = 1.1,
        x = text.attr('x'),
        dy = parseFloat(text.attr('dy'))
      let word,
        lineNumber = 0,
        line: string[] = [],
        tspan = text
          .text(null)
          .append('tspan')
          .attr('x', x)
          .attr('y', 0)
          .attr('dy', `${lineNumber++ * lineHeight + dy}em`);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node()!.getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('x', x)
            .attr('y', 0)
            .attr('dy', `${lineNumber++ * lineHeight + dy}em`)
            .text(word);
        }
      }
    });
  }

  drawBarChart() {
    const { selectedCycle, selectedSector, selectedIndustry } = this.props;

    const data: IndustryData = industryList;
    const label: IndustryMap = industryMap;

    const chartData = data[selectedCycle][selectedSector];
    const chartDataArray: IndustryDataEntry[] = Object.keys(chartData)
      .filter(k => k !== 'total')
      .map(k => ({ industry: label[k], value: chartData[k] }))
      .sort((a, b) => (a.value < b.value) ? 1 : -1);
    const maxMoney = Object.keys(chartData)
      .filter(k => k !== 'total')
      .reduce((m, k) => { return chartData[k] > m ? chartData[k] : m }, -Infinity);

    const selectedIndustryLabel = selectedIndustry && label[selectedIndustry];

    // Source: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
    const svg = d3.select(this.graph);

    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 500 500`);

    const margin = { top: 10, right: 10, bottom: 30, left: 100 };
    const width = 500 - (margin.left + margin.right);
    const height = chartDataArray.length * 25;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .range([0, width])
      .domain([maxMoney, 0])
      .nice();

    const yScale = d3.scaleBand()
      .range([0, height])
      .domain(chartDataArray.map(i => i.industry))
      .padding(0.2);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'chart__text')
      .call(
        d3.axisBottom(xScale)
          .tickFormat(d3.format('.2s'))
      );

    chart.append('g')
      .call(d3.axisLeft(yScale))
      .attr('class', 'chart__text')
      .selectAll('.tick text')
      .call(this.wrapChartLabel, 90);

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
      .attr('class', function (d) {
        if (d.industry === selectedIndustryLabel) {
          return 'bar--selected';
        } else {
          return 'bar--normal';
        }
      })

    barGroups
      .append('rect')
      .attr('class', 'clickbar')
      .attr('x', xScale.domain()[1])
      .attr('y', g => yScale(g.industry)!)
      .attr('height', yScale.bandwidth())
      .attr('width', width)
      .attr('class', 'bar__click')
      .on('click', d => {
        if (d.industry === selectedIndustryLabel) {
          this.onSelectIndustry(null)
        } else {
          this.onSelectIndustry(d)
        }
      });
  }

  onSelectIndustry(d: IndustryDataEntry | null) {
    const { onChange } = this.props;
    if (d === null) {
      onChange(null)
    } else {
      const reverseIndustryMap: IndustryMap = Object.entries(industryMap)
        .reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});
      onChange(reverseIndustryMap[d.industry])
    }
  }

  render() {
    return (
      <div>
        <h3>Industries</h3>
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
  onChange: (industry: string | null) => dispatch(setIndustry(industry))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndustryFilter)
