import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';


import styles from './index.module.css';
import { Header } from '@/components/Header';
import { AppSpinner } from '@/components/AppSpinner';

export const HeaderLayout = () => {
  return (
      <div className={styles.wrapper}>
          <Header />
          <Suspense fallback={<div className={styles.spinnerWrapper}><AppSpinner /></div>}>
            <Outlet />
           </Suspense>
      </div>
  );
};
