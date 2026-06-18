import * as d3 from 'd3';

type KpiStatus = 'good' | 'warning';
type Kpi = {
  label: string;
  value: string;
  status: KpiStatus;
};

const width = 720;
const height = 360;

const cardWidth = 224;
const cardHeight = 132;
const cardPadding = 12;
const cardContentGap = 12;
const cardGap = 24;
const kpiStatusRadius = 24;

const kpis = [
  { label: 'Revenue', value: '$128k', status: 'good' },
  { label: 'Users', value: '24.8k', status: 'good' },
  { label: 'Conversion', value: '4.7%', status: 'warning' },
] satisfies Kpi[];

// prettier-ignore
const svg = d3
  .select('#app')
  .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'container')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black');

const kpiStatusToColorMap: Map<KpiStatus, string> = new Map([
  ['good', 'green'],
  ['warning', 'yellow'],
]);

// prettier-ignore
const renderKpiItem = (item: Kpi, left: number) => {
  const group = svg
    .append('g')
      .classed('kpi-item', true)
      .style('transform', `translate(${left}px, 0)`);

  group
    .append('rect')
      .attr('width', cardWidth)
      .attr('height', cardHeight)
      .attr('fill', 'transparent')
      .attr('stroke', '#000')
      .attr('x', 0)
      .attr('y', 0)

  const label = group
    .append('text')
        .classed('kpi-item-label', true)
        .text(`${item.label}:`)
        .attr('x', cardPadding)
        .attr('y', cardPadding)
        .attr('dominant-baseline', 'hanging');

  const labelHeight = Math.floor(label.node()?.getBBox().height!);

  const value = group
    .append('text')
    .classed('kpi-item-value', true)
    .text(item.value)
    .attr('x', cardPadding)
    .attr('y', cardPadding + labelHeight + cardContentGap)
    .attr('dominant-baseline', 'hanging');

  const valueHeight = Math.floor(value.node()?.getBBox().height!);

  const statusGroup = group
    .append('g')
      .style('transform', `translate(${cardPadding}px, ${cardPadding + labelHeight + valueHeight + cardContentGap * 2}px)`);

  const color = kpiStatusToColorMap.get(item.status) || 'black';

  statusGroup
    .append('circle')
      .attr('r', kpiStatusRadius)
      .attr('cx', kpiStatusRadius)
      .attr('cy', kpiStatusRadius)
      .attr('stroke', color)
      .attr('fill', 'transparent')

  const status = statusGroup
    .append('text')
      .classed('kpi-item-status', true)
      .text(item.status === "good" ? 'G' : 'W')
      .style('fill', color)
      .attr('y', kpiStatusRadius)
      .attr('dominant-baseline', 'middle');

  status.attr('x', kpiStatusRadius - (status.node()?.getBBox().width! / 2))
}

for (let i = 0; i < kpis.length; i++) {
  let leftMargin = i * cardWidth + i * cardGap;

  renderKpiItem(kpis[i], leftMargin);
}
