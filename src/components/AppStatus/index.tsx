import { memo, ReactNode, useState } from 'react';
import { Status } from '@alfalab/core-components/status';
import styles from './index.module.css';

interface AppStatusProps {
  color?: 'green' | 'orange' | 'red' | 'blue' | 'grey' | 'teal' | 'purple';
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
}

const AppStatusInner = ({ color, onClick, children,isActive }: AppStatusProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onClick={onClick}
      className={styles.statusButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Status view={isHovered ||  isActive? 'muted-alt' : 'muted'} size={24} color={color}>
        {children}
      </Status>
    </button>
  );
};

export const AppStatus = memo(AppStatusInner);
