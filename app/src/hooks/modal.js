import { useState } from 'react'

export const useModal = (initStatus) => {
  const [modal, setModal] = useState({
    title: initStatus.title || 'No title',
    width: initStatus.width || '600px',
    isOpen: initStatus.isOpen || false,
    closeOnClick: initStatus.closeOnClick || function() {}
  });

  // セッター
  const set = (obj) => {
    setModal({
      ...modal,
      ...obj
    });
  };

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

  return { ...modal, set, open, close };
};