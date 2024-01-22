import { useState, useRef } from 'react'
import {
  createCalendarEvent,
  updateCalendarEvent,
  destroyCalendarEvent
} from '/src/lib/api/calendarEvent'

export const useCalendarEvent = () => {
  const [calendarEvent, setCalendarEvent] = useState({
    id: NaN,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    color: 'blue'
  });

  // 非同期通信の処理中フラグ
  const isProcess = useRef(false);

  // stateの初期化
  const initState = () => {
    setTimeout(() => {
      setCalendarEvent({
        id: NaN,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        color: 'blue'
      })},
      400
    );
  };

  // stateの更新
  const updateState = (stateObj) => {
    setCalendarEvent({
      ...calendarEvent,
      ...stateObj
    });
  };

  // 作成
  const create = async (callback) => {
    // 非同期通信の処理中ならここで終了
    if (isProcess.current) return;

    // 非同期通信の処理中フラグを立てる
    isProcess.current = true;
    // 予定作成のAPIを叩く
    await createCalendarEvent({
      title: calendarEvent.title,
      description: calendarEvent.description,
      startDate: calendarEvent.startDate,
      endDate: calendarEvent.endDate,
      color: calendarEvent.color
    })
    .then(() => {
      // コールバック関数を実行
      if (typeof callback == 'function') callback();
    })
    .catch((err) => {
      // エラーメッセージのアラートを表示
      const errorMessages = err.response.data.errors;
      alert(errorMessages.join('\n'));
    })
    .finally(() => {
      // 非同期通信の処理中フラグを降ろす
      isProcess.current = false;
    });
  };

  // 更新
  const update = async (callback) => {
    // 非同期通信の処理中ならここで終了
    if (isProcess.current) return;

    // 非同期通信の処理中フラグを立てる
    isProcess.current = true;
    // 予定更新のAPIを叩く
    await updateCalendarEvent({
      id: calendarEvent.id,
      title: calendarEvent.title,
      description: calendarEvent.description,
      startDate: calendarEvent.startDate,
      endDate: calendarEvent.endDate,
      color: calendarEvent.color
    })
    .then(() => {
      // コールバック関数を実行
      if (typeof callback == 'function') callback();
    })
    .catch((err) => {
      // エラーメッセージのアラートを表示
      const errorMessages = err.response.data.errors;
      alert(errorMessages.join('\n'));
    })
    .finally(() => {
      // 非同期通信の処理中フラグを降ろす
      isProcess.current = false;
    });
  };

  // 削除
  const destroy = async (callback) => {
    // 非同期通信の処理中ならここで終了
    if (isProcess.current) return;

    // 非同期通信の処理中フラグを立てる
    isProcess.current = true;
    // 予定削除のAPIを叩く
    await destroyCalendarEvent({
      id: calendarEvent.id
    })
    .then(() => {
      // コールバック関数を実行
      if (typeof callback == 'function') callback();
    })
    .catch((err) => {
      // エラーメッセージのアラートを表示
      const errorMessages = err.response.data.errors;
      alert(errorMessages.join('\n'));
    })
    .finally(() => {
      // 非同期通信の処理中フラグを降ろす
      isProcess.current = false;
    });
  };

  return {
    ...calendarEvent,
    initState,
    updateState,
    create,
    update,
    destroy
  };
};