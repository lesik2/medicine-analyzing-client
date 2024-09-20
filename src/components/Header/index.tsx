import { Typography } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { Button } from '@alfalab/core-components/button';
import { useAtomValue } from 'jotai';
import styles from './index.module.css';
import { config } from './constants';
import { UserInfo } from './UserInfo';
import { Notifications } from './Notifications';
import { Routes } from '@/constants/routes';
import { authUserAtom } from '@/atoms/auth';

export const Header = () => {
  const authUser = useAtomValue(authUserAtom);
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href={Routes.HOME}>
          <Typography.Title tag="h1" color="accent" view="medium">
            {config.title}
          </Typography.Title>
        </Link>
        {authUser ? (
          <div className={styles.infoWrapper}>
            <UserInfo />
            <Notifications />
          </div>

        ) : (
          <Button size={48} view="accent" href={Routes.LOGIN}>
            {config.link}
          </Button>
        )}
      </div>
    </header>
  );
};
