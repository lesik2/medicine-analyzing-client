import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import styles from './index.module.css';
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
      <section className={styles.secondSection}>
        <div className={styles.content}>
          <div className={styles.contentText}>
            <Typography.Title tag="h2" color="primary" view="large">
              {config.secondSection.title}
            </Typography.Title>
            <Typography.Text
              className={styles.secondSectionMessage}
              tag="p"
              color="primary"
              view="primary-large"
              weight="regular"
            >
              {config.secondSection.message}
            </Typography.Text>
          </div>
          <div className={styles.secondSectionIconsWrapper}>
            {config.secondSection.items.map(({ id, title, iconElement }) => (
              <div className={styles.secondSectionIcon} key={id}>
                {iconElement}
                <Typography.Title
                  className={styles.secondSectionMessage}
                  tag="h3"
                  color="primary"
                  view="small"
                  weight="regular"
                >
                  {title}
                </Typography.Title>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
