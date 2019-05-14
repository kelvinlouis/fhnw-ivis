import React, { Component } from 'react';
import * as d3 from 'd3';
import tippy from 'tippy.js';
import { CandidateModel } from '../../models/candidate.model';
import sectors from '../../data/sector_map.json';
import candidates from '../../data/candidate_data.json';
import { CandidateDataJson, SectorMapJson } from '../../data/types';
import {
  formatMoney,
  getDemocratLinearScale, getDolorLinearScale,
  getIndependentLinearScale,
  getRepublicanLinearScale,
} from '../../utils';
import './SectorMap.scss';
import { ScaleLinear } from 'd3';
import { Party } from '../../models/party.enum';

interface Props {
  candidate: CandidateModel;
}

interface Treemap {
  children: TreemapNode[];
}

interface TreemapNode {
  name: string;
  value: number;
  percentage: number;
  key: string;
}

export class SectorMap extends Component<Props> {
  /**
   * Reference to the SVG element
   */
  private graph: SVGElement | null = null;

  componentDidMount() {
    this.createTreemap();
  }

  render() {
    return <svg ref={svg => this.graph = svg} />
  }

  private getSectorAmounts(): TreemapNode[] {
    const { candidate: { cycle, cid } } = this.props;
    const sectorMap: SectorMapJson = sectors;
    const candidateData: CandidateDataJson = candidates;

    const children: TreemapNode[] = [];

    const total = Object
      .keys(sectorMap)
      .reduce((prev, key) => prev + (candidateData[cycle][cid][key] || 0), 0);

    Object
      .keys(sectorMap)
      .forEach((key) => {
        if (candidateData[cycle][cid] != null) {
          const value = candidateData[cycle][cid][key] || 0;
          const name = sectorMap[key];

          if (value > 0) {
            children.push({
              name,
              value,
              percentage: total > 0 ? Math.round((value / total) * 100) : 0,
              key,
            });
          }
        }
      });

    return children;
  }

  private createTreemap() {
    const svg = d3.select(this.graph)
      .attr('class', 'sector-map')
      .attr('viewBox', `0,0,684,124`)
      .attr('width', '684px')
      .attr('height', '124px');

    const children = this.getSectorAmounts();
    const max = children.reduce((prev, curr) => curr.value > prev ? curr.value : prev, 0);
    let color = getDolorLinearScale(0, max);

    const treemapData: Treemap = {
      children,
    };

    const root = d3.hierarchy(treemapData)
      .sum((d: any) => d.value);

    d3.treemap()
      .size([684, 124])
      .padding(2)(root);

    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr('class', 'sector-map__sector-wrapper')
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    leaf
      .append('rect')
      .attr('class', 'sector-map__sector')
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .style('fill', (d: any) => color(d.value))
      .on('mouseover', function(d: any) {
        tippy((this as any), {
          followCursor: true,
          content: `
            ${d.data.name} 
            <strong>
              ${formatMoney(d.value)} (${d.data.percentage}%)
            </strong>`,
        });
      });

    leaf
      .append('text')
      .attr('class', 'sector-map__label')
      .attr('x', () => '0.2rem')
      .attr('y', () => '1rem')
      .attr('width', (d: any) => `calc(${d.x1 - d.x0}px - 0.5rem`)
      .text((d: any) => d.data.name)
      .attr('font-size', '15px')
      .attr('fill', 'black');
  }
}
