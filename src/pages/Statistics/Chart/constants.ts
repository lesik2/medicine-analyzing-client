export const ChartConfig = {
  xAxis: {
    tickLine: false,
    axisLine: false,
    interval: 'preserveStartEnd',
    tickMargin: 10,
    dataKey: 'label',
    type: 'category',
  },
  yAxis: {
    axisLine: false,
    type: 'number',
    tickCount: 6,
    tickLine: false,
    tickMargin: 0,
    tickFormatter: (decimal: number) => `${decimal}\xa0%`,
  },
  cartesianGrid: {
    vertical: false,
    horizontal: true,
    strokeDasharray: '0',
    stroke: 'var(--color-light-neutral-400)',
    fill: 'var(--color-light-base-bg-primary)',
  },
  composeChart: {
    barCategoryGap: '12%',
  },
  barChart: {
    chart: 'bar',
    radius: { top: 5, bottom: 5 },
    offset: 0,
    icon: 'circle',
    properties: {
      name: 'Загруженность',
      dataKey: 'busy',
      fill: '#6a7295',
    },
  },
  tooltip: {
    separator: '% ',
    offset: 20,
    filterNull: true,
    cursor: {
      stroke: 'var(--color-light-neutral-400)',
      strokeWidth: 1,
    },
    isAnimationActive: true,
    animationBegin: 0,
    animationDuration: 500,
    animationEasing: 'ease',
    arrow: true,
  },
} as const;
