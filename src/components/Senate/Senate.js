import React, { Component } from 'react';
import './Senate.scss';

export class Senate extends Component {
  constructor(props) {
    super(props);

    // Reference to svg element
    this.graph = null;
  }

  componentDidMount() {
    console.log(this.graph);
  }

  render() {
    return (
      <div className="senate">
        <svg className="senate__seating" ref={svg => this.graph = svg} viewBox="0 0 360 185">
          <circle cx="13.47" cy="173.34" r="6.67"/>
          <circle cx="30.15" cy="173.34" r="6.67"/>
          <circle cx="46.83" cy="173.34" r="6.67"/>
          <circle cx="63.52" cy="173.34" r="6.67"/>
          <circle cx="80.22" cy="173.34" r="6.67"/>
          <circle cx="96.93" cy="173.35" r="6.67"/>
          <circle cx="16.00" cy="150.30" r="6.67"/>
          <circle cx="33.14" cy="149.45" r="6.67"/>
          <circle cx="50.14" cy="149.75" r="6.67"/>
          <circle cx="67.67" cy="148.50" r="6.67"/>
          <circle cx="84.99" cy="148.80" r="6.67"/>
          <circle cx="21.71" cy="127.84" r="6.67"/>
          <circle cx="39.92" cy="126.35" r="6.67"/>
          <circle cx="102.55" cy="149.24" r="6.67"/>
          <circle cx="57.60" cy="127.12" r="6.67"/>
          <circle cx="30.47" cy="106.38" r="6.67"/>
          <circle cx="77.04" cy="125.14" r="6.67"/>
          <circle cx="50.31" cy="104.63" r="6.67"/>
          <circle cx="95.70" cy="126.20" r="6.67"/>
          <circle cx="68.97" cy="106.18" r="6.67"/>
          <circle cx="42.13" cy="86.35" r="6.67"/>
          <circle cx="115.01" cy="127.84" r="6.67"/>
          <circle cx="64.04" cy="84.85" r="6.67"/>
          <circle cx="91.21" cy="104.32" r="6.67"/>
          <circle cx="56.45" cy="68.14" r="6.67"/>
          <circle cx="83.88" cy="87.60" r="6.67"/>
          <circle cx="111.68" cy="106.97" r="6.67"/>
          <circle cx="80.75" cy="67.53" r="6.67"/>
          <circle cx="73.16" cy="52.08" r="6.67"/>
          <circle cx="109.51" cy="87.03" r="6.67"/>
          <circle cx="101.86" cy="71.97" r="6.67"/>
          <circle cx="133.20" cy="111.05" r="6.67"/>
          <circle cx="100.02" cy="53.10" r="6.67"/>
          <circle cx="91.94" cy="38.50" r="6.67"/>
          <circle cx="131.94" cy="92.31" r="6.67"/>
          <circle cx="122.33" cy="59.78" r="6.67"/>
          <circle cx="131.10" cy="74.08" r="6.67"/>
          <circle cx="112.42" cy="27.65" r="6.67"/>
          <circle cx="121.36" cy="41.94" r="6.67"/>
          <circle cx="155.52" cy="100.34" r="6.67"/>
          <circle cx="134.21" cy="19.75" r="6.67"/>
          <circle cx="144.64" cy="51.44" r="6.67"/>
          <circle cx="155.19" cy="83.13" r="6.67"/>
          <circle cx="144.20" cy="34.34" r="6.67"/>
          <circle cx="154.97" cy="66.05" r="6.67"/>
          <circle cx="156.88" cy="14.94" r="6.67"/>
          <circle cx="168.09" cy="47.20" r="6.67"/>
          <circle cx="167.96" cy="30.48" r="6.67"/>
          <circle cx="180.00" cy="63.33" r="6.67"/>
          <circle cx="180.00" cy="13.33" r="6.67"/>
          <circle cx="180.00" cy="80.00" r="6.67"/>
          <circle cx="180.00" cy="96.67" r="6.67"/>
          <circle cx="192.04" cy="30.48" r="6.67"/>
          <circle cx="191.91" cy="47.20" r="6.67"/>
          <circle cx="203.12" cy="14.94" r="6.67"/>
          <circle cx="205.03" cy="66.05" r="6.67"/>
          <circle cx="215.80" cy="34.34" r="6.67"/>
          <circle cx="204.81" cy="83.13" r="6.67"/>
          <circle cx="215.36" cy="51.44" r="6.67"/>
          <circle cx="225.79" cy="19.75" r="6.67"/>
          <circle cx="204.48" cy="100.34" r="6.67"/>
          <circle cx="238.64" cy="41.94" r="6.67"/>
          <circle cx="247.58" cy="27.65" r="6.67"/>
          <circle cx="228.90" cy="74.08" r="6.67"/>
          <circle cx="237.67" cy="59.78" r="6.67"/>
          <circle cx="228.06" cy="92.31" r="6.67"/>
          <circle cx="268.06" cy="38.50" r="6.67"/>
          <circle cx="259.98" cy="53.10" r="6.67"/>
          <circle cx="226.80" cy="111.05" r="6.67"/>
          <circle cx="258.14" cy="71.97" r="6.67"/>
          <circle cx="250.49" cy="87.03" r="6.67"/>
          <circle cx="286.84" cy="52.08" r="6.67"/>
          <circle cx="279.25" cy="67.53" r="6.67"/>
          <circle cx="248.32" cy="106.97" r="6.67"/>
          <circle cx="276.12" cy="87.60" r="6.67"/>
          <circle cx="303.55" cy="68.14" r="6.67"/>
          <circle cx="268.79" cy="104.32" r="6.67"/>
          <circle cx="295.96" cy="84.85" r="6.67"/>
          <circle cx="244.99" cy="127.84" r="6.67"/>
          <circle cx="317.87" cy="86.35" r="6.67"/>
          <circle cx="291.03" cy="106.18" r="6.67"/>
          <circle cx="264.30" cy="126.20" r="6.67"/>
          <circle cx="309.69" cy="104.63" r="6.67"/>
          <circle cx="282.96" cy="125.14" r="6.67"/>
          <circle cx="329.53" cy="106.38" r="6.67"/>
          <circle cx="302.40" cy="127.12" r="6.67"/>
          <circle cx="257.45" cy="149.24" r="6.67"/>
          <circle cx="320.08" cy="126.35" r="6.67"/>
          <circle cx="338.29" cy="127.84" r="6.67"/>
          <circle cx="275.01" cy="148.80" r="6.67"/>
          <circle cx="292.33" cy="148.50" r="6.67"/>
          <circle cx="309.86" cy="149.75" r="6.67"/>
          <circle cx="326.86" cy="149.45" r="6.67"/>
          <circle cx="344.00" cy="150.30" r="6.67"/>
          <circle cx="263.07" cy="173.35" r="6.67"/>
          <circle cx="279.78" cy="173.34" r="6.67"/>
          <circle cx="296.48" cy="173.34" r="6.67"/>
          <circle cx="313.17" cy="173.34" r="6.67"/>
          <circle cx="329.85" cy="173.34" r="6.67"/>
          <circle cx="346.53" cy="173.34" r="6.67"/>
        </svg>
      </div>
    );
  }
}
