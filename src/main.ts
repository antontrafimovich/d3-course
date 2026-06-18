import * as d3 from 'd3';

type KpiStatus = 'good' | 'warning';
type Kpi = {
  label: string;
  value: string;
  status: KpiStatus;
};

const width = 736;
const height = 360;

const cardWidth = 224;
const cardHeight = 96;
const cardPadding = 12;
const cardContentGap = 12;
const cardTextFontSize = 18;
const cardGap = 24;
const kpiStatusRadius = 6;

const mainGroupGap = 24;
const containerPadding = 8;
const title = 'Q1 Business Overview';
const titleFontSize = 20;


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
const svg = d3
  .select('#app')
  .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'container')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black');

const mainGroup = svg
  .append('g')
    .attr('transform', `translate(${containerPadding}, ${containerPadding})`);

mainGroup
  .append('text')
    .text(title)
    .attr('x', 0)
    .attr('y', 0)
    .attr('dominant-baseline', 'hanging')
    .style('font-size', titleFontSize);

// prettier-ignore
const renderKpiItem = (item: Kpi, left: number, top: number) => {
  const group = mainGroup
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

   group
    .append('text')
      .classed('kpi-item-label', true)
      .text(item.label)
      .attr('font-size', cardTextFontSize)
      .attr('x', cardPadding)
      .attr('y', cardPadding)
      .attr('dominant-baseline', 'hanging');


  group
    .append('text')
      .classed('kpi-item-value', true)
      .text(item.value)
      .attr('font-size', cardTextFontSize)
      .attr('x', cardPadding)
      .attr('y', cardPadding + cardTextFontSize + cardContentGap)
      .attr('dominant-baseline', 'hanging');


  const statusGroup = group
    .append('g')
      .attr('transform', `translate(${cardPadding}, ${cardPadding + cardTextFontSize * 2 + cardContentGap * 2})`);

  const color = kpiStatusToColorMap[item.status] || 'black';

  statusGroup
    .append('circle')
      .attr('r', kpiStatusRadius)
      .attr('cx', kpiStatusRadius)
      .attr('cy', kpiStatusRadius)
      .attr('fill', color);
}

for (let i = 0; i < kpis.length; i++) {
  let leftMargin = i * cardWidth + i * cardGap;

  renderKpiItem(
    kpis[i],
    leftMargin,
    mainGroupGap + titleFontSize,
  );
}
