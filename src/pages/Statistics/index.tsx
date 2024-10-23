import { useAtomValue } from 'jotai';
import { ChartComponent } from './Chart';
import styles from './index.module.css';
import { Controls } from './Controls';
import { Status } from './Status';
import { Heading } from '@/components/Heading';
import { useApiGet } from '@/hooks/useApiGet';
import { getWorkloadConfig } from '@/api/appointments';
import { WorkloadResponse } from '@/types/appointment';
import { getTabsAtom } from '@/atoms/tabs';

export const StatisticsPage = () => {
  const selectedTab = useAtomValue(getTabsAtom);

  const { data } = useApiGet<WorkloadResponse>({
    ...getWorkloadConfig([selectedTab]),
    params: {
      workloadBy: selectedTab,
    },
    options: {
      enabled: Boolean(selectedTab),
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <Heading title="Статистика" />
      <div className={styles.contentWrapper}>
        <Controls />
        <ChartComponent data={data?.items} labels={data?.labels} />
        <Status total={data?.total} />
      </div>
    </div>
  );
};
