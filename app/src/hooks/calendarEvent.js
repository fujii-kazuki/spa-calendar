import { useState } from 'react'

export const useCalendarEvent = () => {
  const [calendarEvent, setCalendarEvent] = useState({
    id: NaN,
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  // 初期化
  const init = () => {
    setCalendarEvent({
      id: NaN,
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    });
  };

  // セッター
  const set = (obj) => {
    setCalendarEvent({
      ...calendarEvent,
      ...obj
    });
  };

  return { ...calendarEvent, set, init };
};