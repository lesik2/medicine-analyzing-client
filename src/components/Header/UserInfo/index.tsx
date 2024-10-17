import { ActionButton } from '@alfalab/core-components/action-button';
import { UserRoundedXxlIcon } from '@alfalab/icons-glyph/UserRoundedXxlIcon';
import { Typography } from '@alfalab/core-components/typography';
import { useAtomValue } from 'jotai';
import styles from './index.module.css';
import { Routes } from '@/constants/routes';
import { authUserAtom } from '@/atoms/auth';

export const UserInfo = () => {
  const authUser = useAtomValue(authUserAtom);
  return (
    <div className={styles.userInfoWrapper}>
      <ActionButton
        className={styles.userButton}
        iconWrapperClassName={styles.userIcon}
        size={'s'}
        icon={<UserRoundedXxlIcon />}
        type="secondary"
        href={Routes.PROFILE}
      />
      <div className={styles.userInfoTextWrapper}>
        <Typography.Text
          rowLimit={1}
          tag="span"
          color="primary"
          view="primary-medium"
        >
          {`${authUser?.name} ${authUser?.surname}`}
        </Typography.Text>
        <Typography.Text tag="span" color="secondary" view="primary-small">
          {authUser?.email}
        </Typography.Text>
      </div>
    </div>
  );
};
