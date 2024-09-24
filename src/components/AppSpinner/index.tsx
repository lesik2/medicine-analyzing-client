import { Spinner } from '@alfalab/core-components/spinner';
import styles from './index.module.css';

export const AppSpinner = () => {
  return <Spinner visible={true} size={48} className={styles.spinner} />;
};
