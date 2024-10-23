import { Tabs, Tab } from '@alfalab/core-components/tabs';
import { memo, useEffect, useState } from 'react';
import { SelectedId } from '@alfalab/core-components/tabs/typings';
import { useAtomValue, useSetAtom } from 'jotai';
import styles from './index.module.css';
import { getTabsAtom, setTabsAtom } from '@/atoms/tabs';

export const TABS = [
  { title: 'Сотрудники', id: 'doctors' },
  { title: 'Кабинеты', id: 'offices' },
];

const ControlsInner = () => {
  const setTabs = useSetAtom(setTabsAtom);
  const selectedTab = useAtomValue(getTabsAtom);
  const [selectedId, setSelectedId] = useState<string | number>(TABS[0].id);

  const handleChange = (
    _event: React.MouseEvent<Element, MouseEvent>,
    payload: { selectedId: SelectedId },
  ) => {
    setSelectedId(payload.selectedId);
    setTabs(payload.selectedId);
  };

  useEffect(() => {
    if (selectedTab !== selectedId) {
      setSelectedId(selectedTab);
    }
  }, [selectedTab, selectedId]);

  return (
    <div className={styles.controlsWrapper}>
      <Tabs
        breakpoint={450}
        selectedId={selectedId}
        onChange={handleChange}
        view="secondary"
        size="xs"
        scrollable={true}
        tagShape="rounded"
        tagView="outlined"
      >
        {TABS.map((item) => (
          <Tab title={item.title} id={item.id} key={item.id} />
        ))}
      </Tabs>
    </div>
  );
};

export const Controls = memo(ControlsInner);
