import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue } from 'jotai';
import { memo, useCallback } from 'react';
import styles from './index.module.css';
import { getTabsAtom } from '@/atoms/tabs';

interface StatusProps {
  total: number | undefined;
}

const StatusInner = ({ total }: StatusProps) => {
  const selectedTab = useAtomValue(getTabsAtom);

  const defineBusyText = useCallback(() => {
    if (!selectedTab) {
      return 'сотрудников';
    }

    return selectedTab === 'doctors' ? 'сотрудников' : 'кабинетов';
  }, [selectedTab]);

  return (
    <div className={styles.statusWrapper}>
      <CircularProgressBar
        value={total || 0}
        size={144}
        view={total || 0 >= 50 ? 'positive' : 'negative'}
        contentColor="primary"
      />
      <Typography.Text className={styles.title} view="primary-medium">
        {' '}
        Общая загруженность {defineBusyText()}
      </Typography.Text>
    </div>
  );
};

export const Status = memo(StatusInner);
