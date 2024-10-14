import { Typography } from '@alfalab/core-components/typography';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export interface MenuItemProps {
  iconElement: ReactNode;
  name: string;
  routePath: string;
  onClick?: () => void;
  isActive: boolean;
}

export const MenuItem = ({
  iconElement,
  name,
  onClick,
  routePath,
  isActive,
}: MenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(routePath);
  };

  return (
    <button
      className={isActive ? styles.wrapperItemActive : styles.wrapperItem}
      onClick={handleClick}
    >
      {iconElement}
      <Typography.Text
        tag="span"
        color={isActive ? 'primary' : 'secondary'}
        view="primary-medium"
      >
        {name}
      </Typography.Text>
    </button>
  );
};
