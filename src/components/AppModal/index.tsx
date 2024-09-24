import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Modal } from '@alfalab/core-components/modal';
import { Typography } from '@alfalab/core-components/typography';
import { CheckmarkMediumMIcon } from '@alfalab/icons-glyph/CheckmarkMediumMIcon';
import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { Button } from '@alfalab/core-components/button';
import styles from './index.module.css';
import { Routes } from '@/constants/routes';

export interface AppModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  primaryBtn: string;
  secondaryBtn: string;
}

export const AppModal = ({
  isOpen,
  handleClose,
  title,
  message,
  primaryBtn,
  secondaryBtn,
}: AppModalProps) => {
  return (
    <ModalDesktop open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <SuperEllipse className={styles.modalIconWrapper} border={true}>
          <CheckmarkMediumMIcon className={styles.modalIcon} />
        </SuperEllipse>
      </Modal.Header>
      <Modal.Content className={styles.modalContent}>
        <Typography.Title tag="h3" color="primary" view="small">
          {title}
        </Typography.Title>
        <Typography.Text tag="p" color="primary" view="primary-large">
          {message}
        </Typography.Text>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Controls
          gap={24}
          layout="center"
          primary={
            <Button size={48} view="primary" href={Routes.LOGIN}>
              {primaryBtn}
            </Button>
          }
          secondary={
            <Button size={48} view="secondary" onClick={handleClose}>
              {secondaryBtn}
            </Button>
          }
        />
      </Modal.Footer>
    </ModalDesktop>
  );
};
