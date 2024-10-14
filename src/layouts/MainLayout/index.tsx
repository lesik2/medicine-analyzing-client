import { Outlet } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import styles from './index.module.css';
import { Menu } from '@/components/Menu';
import { AppNotification } from '@/components/AppNotification';
import { closeNotificationAtom, notificationAtom } from '@/atoms/notification';

export const MainLayout = () => {

  const {visible, title, message, badge}= useAtomValue(notificationAtom)
  const closeNotification = useSetAtom(closeNotificationAtom);
  const handleCloseNotification =()=>{
    closeNotification()
  }
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.wrapperContent}>
        <Outlet />
        <AppNotification
          onClose={handleCloseNotification}
          visible={visible}
          badge={badge}
          title={title}
        >
          {message}
        </AppNotification>
      </div>
    </div>
  );
};
