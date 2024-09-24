import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
