import { Table } from '@alfalab/core-components/table';
import { Typography } from '@alfalab/core-components/typography';
import { PencilMIcon } from '@alfalab/icons-glyph/PencilMIcon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { List } from '@alfalab/core-components/list';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { config, TableHeaders, TableHeadersName } from './constants';
import { DoctorsShiftsItem } from './DoctorsShiftsItem';
import { getCellClassName } from './utiils/getCellClassName';
import { Heading } from '@/components/Heading';
import { useTable } from '@/hooks/useTable';
import { useApiGet } from '@/hooks/useApiGet';
import { createOfficeConfig, getAllOfficesConfig } from '@/api/offices';
import { getSortOrders } from '@/utils/getSortOrders';
import { CreateOffice, GetAllOfficesResponse } from '@/types/office';
import { officeSpecialty } from '@/constants/officeSpeciality';
import { useModal } from '@/hooks/useModal';
import { OfficesForm } from '@/forms/OfficesForm';
import { useApiSend } from '@/hooks/useApiSend';
import { AppNotification } from '@/components/AppNotification';

export const OfficesPage = () => {
  const { handleClose, handleOpen, isOpen, id } = useModal();
  const [showNotification, setShowNotification] = useState(false);

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

  const handleCloseNotification = useCallback(() => {
    setShowNotification(false);
  },[]);

  const handleOpenNotification = useCallback(() => {
    setShowNotification(true);
  },[]);

  const { mutate,isSuccess,isPending } = useApiSend<
    CreateOffice,
    CreateOffice
  >({
    ...createOfficeConfig,
  });
  
  const { data, isFetching, isLoading,refetch } = useApiGet<GetAllOfficesResponse>({
    ...getAllOfficesConfig([
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

  const handleOpenModal = useCallback(
    (newId?: string) => () => {
      handleOpen(newId);
    },
    [handleOpen],
  );

  useEffect(()=>{
    if(isSuccess){
      handleClose();
      handleOpenNotification()
      refetch();
    }
  },[isSuccess,handleOpenNotification,refetch,handleClose])

  

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

            <Table.THeadCell title={TableHeadersName.edit}>
              {TableHeadersName.edit}
            </Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {data?.items?.map(({ id, number, specialty, doctors }) => (
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
                  <Typography.Text
                    view="primary-small"
                    tag="div"
                    showSkeleton={showSkeleton}
                  >
                    {officeSpecialty[specialty]}
                  </Typography.Text>
                </Table.TCell>
                <Table.TCell className={styles[getCellClassName(doctors)]}>
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
                  <IconButton
                    view="primary"
                    size={32}
                    icon={PencilMIcon}
                    transparentBg={true}
                  />
                </Table.TCell>
              </Table.TRow>
            ))}
          </Table.TBody>
        </Table>
      </div>
      {isOpen && <OfficesForm submit={mutate} id={id} handleClose={handleClose} isLoading={isPending} />}
      <AppNotification
          onClose={handleCloseNotification}
          visible={showNotification}
          badge='positive-checkmark'
          title={config.notificationTitle}
        >
          {config.notificationMessage}
        </AppNotification>
    </div>
  );
};
