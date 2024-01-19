import { useState } from 'react'

export const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false
  });

  // 開く
  const open = () => {
    setModal({
      ...modal,
      isOpen: true
    });
  };

  // 閉じる
  const close = () => {
    setModal({
      ...modal,
      isOpen: false
    });
  };

  return { ...modal, open, close };
};