import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { PencilMIcon } from '@alfalab/icons-glyph/PencilMIcon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { List } from '@alfalab/core-components/list';
import { useCallback } from 'react';
import styles from './index.module.css';
import { TableHeaders, TableHeadersName } from './constants';
import { DoctorsShiftsItem } from './DoctorsShiftsItem';
import { useOfficeFilters } from './useOfficeFilters';
import { useMutateOffice } from './useMutateOffice';
import { Heading } from '@/components/Heading';
import { useTable } from '@/hooks/useTable';
import { useApiGet } from '@/hooks/useApiGet';
import { getAllOfficesConfig } from '@/api/offices';
import { getSortOrders } from '@/utils/getSortOrders';
import { GetAllOfficesResponse } from '@/types/office';
import { officeSpecialty } from '@/constants/officeSpeciality';
import { useModal } from '@/hooks/useModal';
import { OfficesForm } from '@/forms/OfficesForm';
import { statusColors } from '@/constants/statusColors';
import { AppStatus } from '@/components/AppStatus';
import { FilterCell } from '@/components/FilterCell';

export const OfficesPage = () => {
  const { handleClose, handleOpen, isOpen, id } = useModal();

  const { filters, set } = useOfficeFilters();
  const {
    sortKey,
    isSortedDesc,
    perPage,
    page,
    handlePageChange,
    handlePerPageChange,
    handleSort,
    possiblePerPageArrays,
    defaultIsSortedDesc,
  } = useTable({ defaultIsSortedDesc: false, defaultSortKey: 'number' });

  const { data, isFetching, isLoading, refetch } =
    useApiGet<GetAllOfficesResponse>({
      ...getAllOfficesConfig([
        sortKey,
        getSortOrders(isSortedDesc),
        page,
        perPage,
        filters.statusFilter,
        filters.specialtyFilter,
      ]),
      params: {
        sortKey: isSortedDesc === undefined ? undefined : sortKey,
        sortDirection: getSortOrders(isSortedDesc),
        page,
        perPage,
        filters: {
          status: filters.statusFilter || undefined,
          specialty: filters.specialtyFilter || undefined,
        },
      },
    });
  const { mutate, isPending } = useMutateOffice({
    id: id,
    refetch: refetch,
    handleClose: handleClose,
  });
  const showSkeleton = isFetching || isLoading;

  const pagesCount = data ? Math.ceil(data.total / perPage) : 0;

  const handleOpenModal = useCallback(
    (newId?: string) => () => {
      handleOpen(newId);
    },
    [handleOpen],
  );

  const handleClickStatus = (status: string) => () => {
    handlePageChange(0);
    set.setStatus(status);
  };

  const handleClickSpecialtyFilter = (specialty: string) => () => {
    handlePageChange(0);
    set.setSpecialty(specialty);
  };

  return (
    <div className={styles.pageWrapper}>
      <Heading title="Кабинеты" onClick={handleOpenModal()} />
      <div className={styles.tableWrapper}>
        <Table
          stickyHeader
          pagination={
            <Table.Pagination
              className={styles.pagination}
              perPage={perPage}
              currentPageIndex={page}
              pagesCount={pagesCount}
              possiblePerPage={possiblePerPageArrays}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          }
        >
          <Table.THead>
            <Table.TSortableHeadCell
              title={TableHeadersName.number}
              defaultIsSortedDesc={defaultIsSortedDesc}
              isSortedDesc={
                sortKey === TableHeaders.number ? isSortedDesc : undefined
              }
              onSort={handleSort(TableHeaders.number)}
            >
              {TableHeadersName.number}
            </Table.TSortableHeadCell>

            <Table.TSortableHeadCell
              title={TableHeadersName.specialty}
              isSortedDesc={
                sortKey === TableHeaders.specialty ? isSortedDesc : undefined
              }
              onSort={handleSort(TableHeaders.specialty)}
            >
              {TableHeadersName.specialty}
            </Table.TSortableHeadCell>

            <Table.THeadCell title={TableHeadersName.doctors}>
              {TableHeadersName.doctors}
            </Table.THeadCell>

            <Table.THeadCell title={TableHeadersName.status}>
              {TableHeadersName.status}
            </Table.THeadCell>

            <Table.THeadCell title={TableHeadersName.edit}>
              {TableHeadersName.edit}
            </Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {data?.items?.map(({ id, number, specialty, doctors, status }) => (
              <Table.TRow key={id}>
                <Table.TCell>
                  <Typography.Text
                    view="primary-small"
                    tag="div"
                    showSkeleton={showSkeleton}
                  >
                    {number}
                  </Typography.Text>
                </Table.TCell>
                <Table.TCell>
                  <Skeleton visible={showSkeleton}>
                    <FilterCell
                      onClick={handleClickSpecialtyFilter(specialty)}
                      isActive={filters.specialtyFilter === specialty}
                    >
                      {officeSpecialty[specialty]}
                    </FilterCell>
                  </Skeleton>
                </Table.TCell>
                <Table.TCell>
                  <Skeleton visible={showSkeleton}>
                    <List tag="ul" marker="•">
                      {doctors.map(({ id, fullName, typeOfShifts }) => (
                        <DoctorsShiftsItem
                          key={id}
                          fullName={fullName}
                          typeOfShifts={typeOfShifts}
                        />
                      ))}
                    </List>
                  </Skeleton>
                </Table.TCell>
                <Table.TCell>
                  <Skeleton visible={showSkeleton}>
                    <AppStatus
                      color={statusColors[status]}
                      onClick={handleClickStatus(status)}
                      isActive={status === filters.statusFilter}
                    >
                      {status}
                    </AppStatus>
                  </Skeleton>
                </Table.TCell>
                <Table.TCell>
                  <Skeleton visible={showSkeleton}>
                    <IconButton
                      view="secondary"
                      size={32}
                      icon={PencilMIcon}
                      transparentBg={true}
                      onClick={handleOpenModal(id)}
                    />
                  </Skeleton>
                </Table.TCell>
              </Table.TRow>
            ))}
          </Table.TBody>
        </Table>
      </div>
      {isOpen && (
        <OfficesForm
          submit={mutate}
          id={id}
          handleClose={handleClose}
          isLoading={isPending}
        />
      )}
    </div>
  );
};
