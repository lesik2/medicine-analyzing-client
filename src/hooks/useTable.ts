import { useCallback, useState } from 'react';

const possiblePerPageArrays = [15, 25, 50];

interface useTableProps {
  defaultSortKey?: string;
  defaultIsSortedDesc?: boolean;
}

export const useTable = ({
  defaultIsSortedDesc,
  defaultSortKey,
}: useTableProps) => {
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(
    defaultIsSortedDesc,
  );
  const [perPage, setPerPage] = useState(possiblePerPageArrays[0]);
  const [page, setPage] = useState(0);

  const handlePerPageChange = useCallback((value: number) => {
    setPage(0);
    setPerPage(value);
  }, []);

  const handlePageChange = useCallback(
    (pageIndex: number) => setPage(pageIndex),
    [],
  );

  const handleSort = useCallback(
    (key: string) => () => {
      setSortKey(key);

      if (isSortedDesc !== undefined) {
        setIsSortedDesc(!isSortedDesc ? undefined : defaultIsSortedDesc);
      } else {
        setIsSortedDesc(!defaultIsSortedDesc);
      }
    },
    [defaultIsSortedDesc, isSortedDesc],
  );

  return {
    sortKey,
    isSortedDesc,
    perPage,
    page,
    handlePerPageChange,
    handlePageChange,
    handleSort,
    possiblePerPageArrays,
    defaultIsSortedDesc,
  };
};
