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
const cardHeight = 96;
const cardPadding = 12;
const cardContentGap = 12;
const cardGap = 24;
const kpiStatusRadius = 6;
const mainGroupGap = 24;

const dashboardTitleValue = 'Q1 Business Overview';

const kpis = [
  { label: 'Revenue', value: '$128k', status: 'good' },
  { label: 'Users', value: '24.8k', status: 'good' },
  { label: 'Conversion', value: '4.7%', status: 'warning' },
] satisfies Kpi[];

const kpiStatusToColorMap: Record<KpiStatus, string> = {
  good: 'green',
  warning: 'orange',
};

// prettier-ignore
const renderKpiItem = (container: d3.Selection<SVGGElement, unknown, HTMLElement, any>, item: Kpi, left: number, top: number) => {
  const group = container
    .append('g')
      .classed('kpi-item', true)
      .attr('transform', `translate(${left}, ${top})`);

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
      .attr('transform', `translate(${cardPadding}, ${cardPadding + labelHeight + valueHeight + cardContentGap * 2})`);

  const color = kpiStatusToColorMap[item.status] || 'black';

  statusGroup
    .append('circle')
      .attr('r', kpiStatusRadius)
      .attr('cx', kpiStatusRadius)
      .attr('cy', kpiStatusRadius)
      .attr('fill', color);
}

// prettier-ignore
const svg = d3
  .select('#app')
  .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'container')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black');

const mainGroup = svg.append('g');

const dashboardTitle = mainGroup
  .append('text')
  .text(dashboardTitleValue)
  .attr('dominant-baseline', 'hanging');

const dashboardTitleHeight = dashboardTitle.node()?.getBBox().height!;

for (let i = 0; i < kpis.length; i++) {
  let leftMargin = i * cardWidth + i * cardGap;

  renderKpiItem(
    mainGroup,
    kpis[i],
    leftMargin,
    mainGroupGap + dashboardTitleHeight,
  );
}
