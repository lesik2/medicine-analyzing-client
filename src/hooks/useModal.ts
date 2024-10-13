import { useCallback, useState } from 'react';

export const useModal = () => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((newId?: string) => {
    if (newId) {
      setId(newId);
    }
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setId(undefined);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    id,
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
