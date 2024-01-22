import { useState } from 'react'

export const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false
  });

  // モーダルを閉じる処理のタイムアウト時間(ミリ秒)
  //// 閉じるアニメーションを最後まで再生する為
  const closeTimeoutMS = 400;

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

    return new Promise((resolve) => setTimeout(resolve, closeTimeoutMS));
  };

  return { ...modal, closeTimeoutMS, open, close };
};