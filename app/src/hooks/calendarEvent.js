import { useState } from 'react'

export const useCalendarEvent = () => {
  const [calendarEvent, setCalendarEvent] = useState({
    id: NaN,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    color: 'blue'
  });

  // 初期化
  const init = () => {
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

  // セッター
  const set = (obj) => {
    setCalendarEvent({
      ...calendarEvent,
      ...obj
    });
  };

  return { ...calendarEvent, init, set };
};