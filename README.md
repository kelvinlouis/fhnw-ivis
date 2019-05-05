# Monetary Influence in U.S. Politics

- Student 1: Kelvin Louis
- Student 2: Nicola Cocquio

## Short description
We want to show how companies and industries influenced politicians and parties over time by donating money.
The focus is on the US congress (Senate & House).
Companies either donate directly or indirectly via PACs (Political Action Committees).
The goal is to have a compact overview of the two chambers (seating arrangement) and
show who has received how much from where. Clicking on an individual shows a summary.
The change of the political landscape should be visible by changing the timeline.

This project is an assignment of [ivis](https://www.fhnw.ch/de/studium/module/9018825?show_language=en) course at the Part of the University of Applied Sciences and Arts Northwestern Switzerland (FHNW).

## Technical information
Our project is built on top of React using TypeScript. A full list of libraries and frameworks is listed below.
We bootstraped it with the popular CLI [create-react-app](https://github.com/facebook/create-react-app).
A production build is provided inside of `build/`.

The following libraries and frameworks were used.
- React
- Redux
- TypeScript
- D3.js
- Bulma

### Prerequisites
In order to start developing or building the client, the following tools are required:
- **Node.js**: v10.x.x
- **Yarn**: v1.15.2 or
- **npm**: v6.x.x

We use _Yarn_ as our package manager. Using _npm_ instead should not be a problem.

### Development
Before starting developing, please ensure that you installed all prerequisites correctly.

```
# Installing all dependencies (node_modules)
yarn

# Starting the development server: http://localhost:3000/
yarn start

# Build
yarn build
```

## Status
|Version|Status|
|--|--|
|First prototype ready | yes |
|Final version ready  | no |

## Sources
### Data
- https://github.com/unitedstates/congress-legislators
- https://www.opensecrets.org/open-data/bulk-data
- https://www.fec.gov/data/browse-data/?tab=bulk-data

### Graphs
- Bar chart: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
- Text Wrapping in Charts: https://bl.ocks.org/mbostock/7555321
- Senate Seating: https://en.wikipedia.org/wiki/United_States_Congress#/media/File:116th_United_States_Senate.svg
- House Seating: https://en.wikipedia.org/wiki/United_States_Congress#/media/File:116th_US_House_of_Representatives.svg
