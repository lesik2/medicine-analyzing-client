import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Modal } from '@alfalab/core-components/modal';
import { Button } from '@alfalab/core-components/button';
import { memo, ReactNode } from 'react';
import { config } from './constants';
import { getTitleName } from './getTitleName';

export interface AppModalProps {
  id: string | undefined;
  handleClose: () => void;
  handleSubmit: () => void;
  children?: ReactNode;
  title: string;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
}

export const FormModalInner = ({
  id,
  handleClose,
  handleSubmit,
  children,
  title,
  primaryDisabled,
  primaryLoading,
}: AppModalProps) => {
  return (
    <ModalDesktop open={true} onClose={handleClose}>
      <Modal.Header>{getTitleName(title, id)}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <Modal.Controls
          gap={24}
          layout="start"
          primary={
            <Button
              size={48}
              view="primary"
              onClick={handleSubmit}
              loading={primaryLoading}
              disabled={primaryDisabled}
            >
              {id ? config.editBtnText : config.addBtnText}
            </Button>
          }
          secondary={
            <Button size={48} view="secondary" onClick={handleClose}>
              {config.cancelBtnText}
            </Button>
          }
        />
      </Modal.Footer>
    </ModalDesktop>
  );
};

export const FormModal = memo(FormModalInner);
