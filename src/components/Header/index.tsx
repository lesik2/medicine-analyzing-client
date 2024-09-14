import { Typography } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { Button } from '@alfalab/core-components/button';
import styles from './index.module.css';
import { config } from './constants';
import { RoutePaths } from '@/routes/route-paths';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href={RoutePaths.HOME}>
          <Typography.Title tag="h1" color="accent" view="medium">
            {config.title}
          </Typography.Title>
        </Link>

        <Button size={40} view="accent" href={RoutePaths.LOGIN}>
          {config.link}
        </Button>
      </div>
    </header>
  );
};
