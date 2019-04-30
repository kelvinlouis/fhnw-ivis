import React, { Component } from 'react';
import './App.scss';
import { House } from './components/House/House';
import { Senate } from './components/Senate/Senate';
import { IndustryFilter } from './components/IndustryFilter/IndustryFilter';

class App extends Component {
  render() {
    return (
      <div className="app">
        <House />
        <Senate />
        <div className="app__filters">
          <IndustryFilter />
        </div>
      </div>
    );
  }
}

export default App;
