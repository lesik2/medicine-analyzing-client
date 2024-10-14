import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { PencilMIcon } from '@alfalab/icons-glyph/PencilMIcon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Skeleton } from '@alfalab/core-components/skeleton';
import styles from './index.module.css';
import { TableHeadersName, TableHeaders } from './constants';
import { Heading } from '@/components/Heading';
import { useTable } from '@/hooks/useTable';
import { useApiGet } from '@/hooks/useApiGet';
import { getAllDoctorsConfig } from '@/api/doctors';
import { GetAllDoctorsResponse } from '@/types/doctor';
import { doctorSpecialty } from '@/constants/doctorSpecialty';
import { shiftsOfWork } from '@/constants/typeOfShifts';
import { getSortOrders } from '@/utils/getSortOrders';

export const DoctorsPage = () => {
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

  const { data, isFetching, isLoading } = useApiGet<GetAllDoctorsResponse>({
    ...getAllDoctorsConfig([
      sortKey,
      getSortOrders(isSortedDesc),
      page,
      perPage,
    ]),
    params: {
      sortKey: isSortedDesc === undefined ? undefined : sortKey,
      sortDirection: getSortOrders(isSortedDesc),
      page,
      perPage,
    },
  });

  const showSkeleton = isFetching || isLoading;

  const pagesCount = data ? Math.ceil(data.total / perPage) : 0;

  return (
    <div className={styles.pageWrapper}>
      <Heading title="Персонал" onClick={() => console.log('d')} />
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
                    <Typography.Text
                      view="primary-small"
                      tag="div"
                      showSkeleton={showSkeleton}
                    >
                      {doctorSpecialty[specialty]}
                    </Typography.Text>
                  </Table.TCell>
                  <Table.TCell>
                    <Typography.Text
                      view="primary-small"
                      tag="div"
                      showSkeleton={showSkeleton}
                    >
                      {shiftsOfWork[typeOfShifts]}
                    </Typography.Text>
                  </Table.TCell>
                  <Table.TCell>
                    <Typography.Text
                      view="primary-small"
                      tag="div"
                      showSkeleton={showSkeleton}
                    >
                      {officeNumber}
                    </Typography.Text>
                  </Table.TCell>
                  <Table.TCell>
                  <Skeleton visible={showSkeleton}>
                    <IconButton
                      view="secondary"
                      size={32}
                      icon={PencilMIcon}
                      transparentBg={true}
                    />
                    </Skeleton>
                  </Table.TCell>
                </Table.TRow>
              ),
            )}
          </Table.TBody>
        </Table>
      </div>
    </div>
  );
};
