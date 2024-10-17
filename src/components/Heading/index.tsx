import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import { memo } from 'react';
import styles from './index.module.css';

interface HeadingProps {
  title: string;
  onClick?: () => void;
}

const addButtonText = 'Добавить';

const HeadingInner = ({ title, onClick }: HeadingProps) => {
  return (
    <div className={styles.headingWrapper}>
      <Typography.Title tag="h3" color="primary" view="medium">
        {title}
      </Typography.Title>
      {onClick && (
        <Button size={40} view="accent" onClick={onClick}>
          {addButtonText}
        </Button>
      )}
    </div>
  );
};
export const Heading = memo(HeadingInner);
