import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import _ from 'lodash';

const chartColors = [
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
];

const BarComponent = ({ x, y, width, height, color, borderColor, data }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-3}
        y={7}
        width={width}
        height={height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={width} height={height} fill={color} />
      <rect
        x={width - 5}
        width={5}
        height={height}
        fill={borderColor}
        fillOpacity={0.2}
      />
      <text
        x={width - 16}
        y={height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        {data.indexValue}
      </text>
      <text
        x={width - 16}
        y={height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        {data.value}
      </text>
    </g>
  );
};

const BarScores = ({ players }) => {
  return (
    <ResponsiveBar
      data={_.reverse(players)}
      indexBy="username"
      keys={['score']}
      layout="horizontal"
      margin={{
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      }}
      groupMode="grouped"
      colorBy={a => {
        return chartColors[a.index] || '#000';
      }}
      enableGridY={false}
      axisLeft={null}
      axisBottom={null}
      barComponent={BarComponent}
      padding={0.175}
    />
  );
};

export default BarScores;
