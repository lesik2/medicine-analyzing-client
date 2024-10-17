import { Notification } from '@alfalab/core-components/notification';
import { ReactNode } from 'react';
import { StatusBadgeViews } from '@alfalab/core-components/status-badge';
import styles from './index.module.css';

type NotificationProps = {
  onClose: () => void;
  visible: boolean;
  title: string;
  children: ReactNode;
  badge: StatusBadgeViews;
};

export const AppNotification = ({
  onClose,
  visible,
  title,
  children,
  badge,
}: NotificationProps) => {
  return (
    <Notification
      contentClassName={styles.contentClassName}
      titleClassName={styles.titleClassName}
      autoCloseDelay={3000}
      onCloseTimeout={onClose}
      onClose={onClose}
      hasCloser
      visible={visible}
      badge={badge}
      title={title}
    >
      {children}
    </Notification>
  );
};
