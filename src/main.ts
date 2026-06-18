import * as d3 from 'd3';

type FeatureStatus = 'stable' | 'improving' | 'critical';

type Feature = {
  id: string;
  name: string;
  users: number;
  satisfaction: number;
  status: FeatureStatus;
};

const initialFeatures = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    users: 4200,
    satisfaction: 82,
    status: 'stable',
  },
  {
    id: 'reports',
    name: 'Reports',
    users: 3100,
    satisfaction: 74,
    status: 'improving',
  },
  {
    id: 'exports',
    name: 'Exports',
    users: 1800,
    satisfaction: 61,
    status: 'critical',
  },
  {
    id: 'alerts',
    name: 'Alerts',
    users: 2600,
    satisfaction: 69,
    status: 'improving',
  },
] satisfies Feature[];

const updatedFeatures = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    users: 4500,
    satisfaction: 84,
    status: 'stable',
  },
  {
    id: 'reports',
    name: 'Reports',
    users: 3400,
    satisfaction: 78,
    status: 'stable',
  },
  {
    id: 'alerts',
    name: 'Alerts',
    users: 2900,
    satisfaction: 73,
    status: 'improving',
  },
  {
    id: 'automation',
    name: 'Automation',
    users: 1600,
    satisfaction: 88,
    status: 'improving',
  },
] satisfies Feature[];

const featureStatusToColorMap: Record<FeatureStatus, string> = {
  stable: 'green',
  improving: 'orange',
  critical: 'red',
};

const width = 720;
const height = 360;

const svg = d3
  .select('#app')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('border', '1px solid black');

const mainGroup = svg.append('g').classed('main-group', true);

const baseRadius = 48;

const getRadiusByFeature = (f: Feature, features: Feature[]): number => {
  const usersCount = features.reduce(
    (result, feature) => result + feature.users,
    0,
  );

  return (f.users / usersCount) * baseRadius;
};

const getPositionByFeature = (f: Feature): [number, number] => {
  if (f.id === 'dashboard') {
    return [120, 60];
  }

  if (f.id === 'reports') {
    return [240, 90];
  }

  if (f.id === 'exports') {
    return [360, 170];
  }

  if (f.id === 'alerts') {
    return [480, 140];
  }

  if (f.id === 'automation') {
    return [650, 260];
  }

  return [0, 0];
};

const renderFeatures = (features: Feature[]) => {
  mainGroup
    .selectAll<SVGElement, Feature>('g.feature')
    .data(features, (d) => d.id)
    .join(
      (enter) => {
        const featureGroups = enter
          .append('g')
          .classed('feature', true)
          .attr('transform', (d) => `translate(${getPositionByFeature(d)})`);

        featureGroups
          .append('circle')
          .attr('r', (d) => getRadiusByFeature(d, features))
          .attr('cx', (d) => getRadiusByFeature(d, features))
          .attr('cy', (d) => getRadiusByFeature(d, features))
          .attr('fill', (d) => featureStatusToColorMap[d.status]);

        featureGroups
          .append('text')
          .classed('feature-name', true)
          .attr('font-size', 16)
          .attr('x', 0)
          .attr('y', (d) => getRadiusByFeature(d, features) * 2)
          .attr('dominant-baseline', 'hanging')
          .text((d) => d.name);

        featureGroups
          .append('text')
          .classed('feature-users', true)
          .attr('font-size', 16)
          .attr('x', 0)
          .attr('y', (d) => getRadiusByFeature(d, features) * 2 + 16)
          .attr('dominant-baseline', 'hanging')
          .text((d) => `Users: ${d.users}`);

        featureGroups
          .append('text')
          .classed('feature-satisfaction', true)
          .attr('font-size', 16)
          .attr('x', 0)
          .attr('y', (d) => getRadiusByFeature(d, features) * 2 + 32)
          .attr('dominant-baseline', 'hanging')
          .text((d) => `Satisfaction: ${d.satisfaction}`);

        return featureGroups;
      },
      (featureGroups) => {
        featureGroups
          .select('circle')
          .attr('r', (d) => getRadiusByFeature(d, features))
          .attr('cx', (d) => getRadiusByFeature(d, features))
          .attr('cy', (d) => getRadiusByFeature(d, features))
          .attr('fill', (d) => featureStatusToColorMap[d.status]);

        featureGroups
          .select('text.feature-users')
          .attr('y', (d) => getRadiusByFeature(d, features) * 2 + 16)
          .text((d) => `Users: ${d.users}`);

        featureGroups
          .select('text.feature-satisfaction')
          .attr('y', (d) => getRadiusByFeature(d, features) * 2 + 32)
          .text((d) => `Satisfaction: ${d.satisfaction}`);

        return featureGroups;
      },
      (exit) => exit.remove(),
    )
};

renderFeatures(initialFeatures);

setTimeout(() => renderFeatures(updatedFeatures), 3000);
