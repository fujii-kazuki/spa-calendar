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

  return { ...calendarEvent, initState, updateState };
};