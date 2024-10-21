import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Modal } from '@alfalab/core-components/modal';
import { Typography } from '@alfalab/core-components/typography';
import { CheckmarkMediumMIcon } from '@alfalab/icons-glyph/CheckmarkMediumMIcon';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { Button } from '@alfalab/core-components/button';
import styles from './index.module.css';

export interface AppModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handlePrimaryClick: () => void;
  headerTitle?: string;
  title?: string;
  message?: string;
  primaryBtn: string;
  secondaryBtn: string;
  showIcon?: boolean;
  isPending?: boolean;
}

export const AppModal = ({
  isOpen,
  handleClose,
  handlePrimaryClick,
  title,
  message,
  primaryBtn,
  secondaryBtn,
  showIcon = true,
  headerTitle,
  isPending,
}: AppModalProps) => {
  return (
    <ModalDesktop open={isOpen} onClose={handleClose}>
      <Modal.Header>
        {headerTitle && headerTitle}
        {showIcon && (
          <SuperEllipse className={styles.modalIconWrapper} border={true}>
            <CheckmarkMediumMIcon className={styles.modalIcon} />
          </SuperEllipse>
        )}
      </Modal.Header>
      <Modal.Content className={styles.modalContent}>
        {title && (
          <Typography.Title tag="h3" color="primary" view="small">
            {title}
          </Typography.Title>
        )}
        {message && (
          <Typography.Text
            className={styles.modalMessage}
            tag="p"
            color="primary"
            view="primary-large"
          >
            {message}
          </Typography.Text>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Modal.Controls
          gap={24}
          layout="center"
          primary={
            <Button size={48} view="secondary" onClick={handleClose}>
              {secondaryBtn}
            </Button>
          }
          secondary={
            <Button
              size={48}
              onClick={handlePrimaryClick}
              view="primary"
              loading={isPending}
            >
              {primaryBtn}
            </Button>
          }
        />
      </Modal.Footer>
    </ModalDesktop>
  );
};
