import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { PencilMIcon } from '@alfalab/icons-glyph/PencilMIcon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { useCallback } from 'react';
import styles from './index.module.css';
import { TableHeadersName, TableHeaders } from './constants';
import { useDoctorsFilters } from './useDoctorsFilters';
import { useMutateDoctor } from './useMutateDoctor';
import { Heading } from '@/components/Heading';
import { useTable } from '@/hooks/useTable';
import { useApiGet } from '@/hooks/useApiGet';
import { getAllDoctorsConfig } from '@/api/doctors';
import { GetAllDoctorsResponse } from '@/types/doctor';
import { doctorSpecialty } from '@/constants/doctorSpecialty';
import { shiftsOfWork } from '@/constants/typeOfShifts';
import { getSortOrders } from '@/utils/getSortOrders';
import { useModal } from '@/hooks/useModal';
import { DoctorsForm } from '@/forms/DoctorsForm';
import { FilterCell } from '@/components/FilterCell';

export const DoctorsPage = () => {
  const { handleClose, handleOpen, isOpen, id } = useModal();

  const { filters, set } = useDoctorsFilters();
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
  } = useTable({ defaultIsSortedDesc: false, defaultSortKey: 'surname' });

  const { data, isFetching, isLoading, refetch } =
    useApiGet<GetAllDoctorsResponse>({
      ...getAllDoctorsConfig([
        sortKey,
        getSortOrders(isSortedDesc),
        page,
        perPage,
        filters.typeOfShifts,
        filters.specialtyFilter,
        filters.numberFilter,
      ]),
      params: {
        sortKey: isSortedDesc === undefined ? undefined : sortKey,
        sortDirection: getSortOrders(isSortedDesc),
        page,
        perPage,
        filters: {
          typeOfShifts: filters.typeOfShifts || undefined,
          specialty: filters.specialtyFilter || undefined,
          number: filters.numberFilter || undefined,
        },
      },
    });

  const { mutate, isPending } = useMutateDoctor({
    id: id,
    refetch: refetch,
    handleClose: handleClose,
  });

  const handleOpenModal = useCallback(
    (newId?: string) => () => {
      handleOpen(newId);
    },
    [handleOpen],
  );
  const handleClickSpecialtyFilter = (specialty: string) => () => {
    handlePageChange(0);
    set.setSpecialty(specialty);
  };
  const handleClickTypeOfShiftsFilter = (typeOfShifts: string) => () => {
    handlePageChange(0);
    set.setTypeOfShifts(typeOfShifts);
  };
  const handleClickNumberFilter = (number: number | null) => () => {
    if(!number) return;
    handlePageChange(0);
    set.setNumber(number.toString());
  };

  const showSkeleton = isFetching || isLoading;

  const pagesCount = data ? Math.ceil(data.total / perPage) : 0;

  return (
    <div className={styles.pageWrapper}>
      <Heading title="Персонал" onClick={handleOpenModal()} />
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
              title={TableHeadersName.fullName}
              defaultIsSortedDesc={defaultIsSortedDesc}
              isSortedDesc={
                sortKey === TableHeaders.surname ? isSortedDesc : undefined
              }
              onSort={handleSort(TableHeaders.surname)}
            >
              {TableHeadersName.fullName}
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

            <Table.TSortableHeadCell
              title={TableHeadersName.typeOfShifts}
              isSortedDesc={
                sortKey === TableHeaders.typeOfShifts ? isSortedDesc : undefined
              }
              onSort={handleSort(TableHeaders.typeOfShifts)}
            >
              {TableHeadersName.typeOfShifts}
            </Table.TSortableHeadCell>

            <Table.TSortableHeadCell
              title={TableHeadersName.officeNumber}
              isSortedDesc={
                sortKey === TableHeaders.officeNumber ? isSortedDesc : undefined
              }
              onSort={handleSort(TableHeaders.officeNumber)}
            >
              {TableHeadersName.officeNumber}
            </Table.TSortableHeadCell>
            <Table.THeadCell title={TableHeadersName.edit}>
              {TableHeadersName.edit}
            </Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {data?.items?.map(
              ({ fullName, id, specialty, officeNumber, typeOfShifts }) => (
                <Table.TRow key={id}>
                  <Table.TCell width={300}>
                    <Typography.Text
                      view="primary-small"
                      tag="div"
                      showSkeleton={showSkeleton}
                    >
                      {fullName}
                    </Typography.Text>
                  </Table.TCell>
                  <Table.TCell>
                    <Skeleton visible={showSkeleton}>
                      <FilterCell
                        onClick={handleClickSpecialtyFilter(specialty)}
                        isActive={filters.specialtyFilter === specialty}
                      >
                        {doctorSpecialty[specialty]}
                      </FilterCell>
                    </Skeleton>
                  </Table.TCell>
                  <Table.TCell>
                    <Skeleton visible={showSkeleton}>
                      <FilterCell
                        onClick={handleClickTypeOfShiftsFilter(typeOfShifts)}
                        isActive={filters.typeOfShifts === typeOfShifts}
                      >
                        {shiftsOfWork[typeOfShifts]}
                      </FilterCell>
                    </Skeleton>
                  </Table.TCell>
                  <Table.TCell>
                    <Skeleton visible={showSkeleton}>
                      <FilterCell
                        onClick={handleClickNumberFilter(officeNumber)}
                        isActive={filters.numberFilter === officeNumber?.toString()}
                      >
                        {officeNumber}
                      </FilterCell>
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
              ),
            )}
          </Table.TBody>
        </Table>
      </div>
      {isOpen && (
        <DoctorsForm
          id={id}
          handleClose={handleClose}
          isLoading={isPending}
          submit={mutate}
        />
      )}
    </div>
  );
};
