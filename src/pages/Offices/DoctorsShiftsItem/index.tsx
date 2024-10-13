import { List } from '@alfalab/core-components/list';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { memo } from 'react';
import { TypesOfShifts } from '@/types';
import { shiftsOfWork } from '@/constants/typeOfShifts';

interface DoctorsShiftsItemProps {
  fullName: string;
  typeOfShifts: TypesOfShifts;
}

const DoctorsShiftsItemInner = ({
  fullName,
  typeOfShifts,
}: DoctorsShiftsItemProps) => {
  return (
    <List.Item>
      <Space size={0} direction="vertical">
        <Typography.Text view="primary-small" tag="div">
          {fullName}
        </Typography.Text>
        <Typography.Text view="primary-small" tag="div">
          {shiftsOfWork[typeOfShifts]}
        </Typography.Text>
      </Space>
    </List.Item>
  );
};

export const DoctorsShiftsItem = memo(DoctorsShiftsItemInner);
