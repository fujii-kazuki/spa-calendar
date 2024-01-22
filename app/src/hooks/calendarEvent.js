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
    setCalendarEvent({
      id: NaN,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      color: 'blue'
    });
  };

  // stateの更新
  const updateState = (stateObj) => {
    setCalendarEvent({
      ...calendarEvent,
      ...stateObj
    });
  };

  // 作成
  const create = () => {
    return new Promise((resolve) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;

      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // 予定作成のAPIを叩く
      createCalendarEvent({
        title: calendarEvent.title,
        description: calendarEvent.description,
        startDate: calendarEvent.startDate,
        endDate: calendarEvent.endDate,
        color: calendarEvent.color
      })
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };

  // 更新
  const update = () => {
    return new Promise((resolve) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;

      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // 予定更新のAPIを叩く
      updateCalendarEvent({
        id: calendarEvent.id,
        title: calendarEvent.title,
        description: calendarEvent.description,
        startDate: calendarEvent.startDate,
        endDate: calendarEvent.endDate,
        color: calendarEvent.color
      })
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };
  
  // 削除
  const destroy = () => {
    return new Promise((resolve) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;
    
      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // 予定削除のAPIを叩く
      destroyCalendarEvent({
        id: calendarEvent.id
      })
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
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