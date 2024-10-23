import { atom } from 'jotai';

interface TabsProps {
  selectedId: string | number;
}

export const tabsAtom = atom<TabsProps>({
  selectedId: 'doctors',
});

export const setTabsAtom = atom(null, (_get, set, payload: string | number) => {
  set(tabsAtom, {
    selectedId: payload,
  });
});

export const getTabsAtom = atom((get) => {
  return get(tabsAtom).selectedId;
});
