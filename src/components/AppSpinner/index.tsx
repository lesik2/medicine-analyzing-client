import { Spinner } from '@alfalab/core-components/spinner';
import styles from './index.module.css';

export const AppSpinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Spinner visible={true} size={48} className={styles.spinnerWrapper} />
    </div>
  );
};
