import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import styles from './index.module.css'
import { config } from './constants';
import { Routes } from '@/constants/routes';


export const HomePage = () => {
  return (
  <div className={styles.pageWrapper}>
    <section className={styles.firstSection}>
      <div className={styles.healthyFamilyImgWrapper} />
      <div className={styles.firstSectionWrapper}>
      <Typography.Title tag="h1" color="primary" view="xlarge">
            {config.firstSection.title}
        </Typography.Title>
        <div className={styles.buttonWrapper}>
          <Button block={false} size={56} view="accent" href={Routes.TICKETS}>
              {config.firstSection.link}
          </Button>
        </div>

      </div>
    </section>
  </div>
  )
};
