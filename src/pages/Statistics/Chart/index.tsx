/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Chart } from '@alfalab/core-components/chart';
import { memo, useMemo } from 'react';
import styles from './index.module.css';
import { ChartConfig } from './constants';
import { WorkloadItem } from '@/types/appointment';

interface ChartProps {
  data: WorkloadItem[] | undefined;
  labels: string[] | undefined;
}

const ChartComponentInner = ({ data, labels }: ChartProps) => {
  const barChart = useMemo(
    () => ({
      ...ChartConfig.barChart,
      data: data || [],
    }),
    [data],
  );

  const labelsValue = useMemo(() => labels || [], [labels]);

  return (
    <div className={styles.chartWrapper}>
      <Chart
        id="bar-chart"
        cartesianGrid={ChartConfig.cartesianGrid}
        composeChart={ChartConfig.composeChart}
        xAxis={ChartConfig.xAxis}
        yAxis={ChartConfig.yAxis}
        labels={labelsValue}
        tooltip={ChartConfig.tooltip}
        // @ts-ignore
        series={[barChart]}
      />
    </div>
  );
};

export const ChartComponent = memo(ChartComponentInner);
