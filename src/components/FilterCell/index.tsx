import { Typography } from '@alfalab/core-components/typography';
import { memo, ReactNode } from 'react';
import styles from './index.module.css'

interface FilterCellProps {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const FilterCellInner = ({ onClick, children,isActive }: FilterCellProps) => {
  return (
    <button onClick={onClick} className={ isActive?styles.filterButtonActive: styles.filterButton}>
        <Typography.Text view="primary-small" tag="div">
            {children}
        </Typography.Text>
    </button>
  );
};

export const FilterCell = memo(FilterCellInner);
