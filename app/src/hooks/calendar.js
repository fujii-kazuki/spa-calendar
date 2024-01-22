import { useState } from 'react'
import { getCalendarEvents } from '/src/lib/api/calendarEvent'

export const  useCalendar = () => {
  const [calendar, setCalendar] = useState({
    events: []
  });

  // 更新
  const update = () => {
    return new Promise((resolve, reject) => {
      // 予定取得のAPIを叩く
      getCalendarEvents()
      .then((res) => {
        const events = res.data.map((calendarEvent) => {
          return {
            id: calendarEvent.id,
            title: calendarEvent.title,
            description: calendarEvent.description,
            start: new Date(calendarEvent.startDate),
            end: new Date(calendarEvent.endDate),
            classNames: [calendarEvent.color]
          };
        });
        // stateの更新
        setCalendar({ ...calendar, events: events });
        resolve();
      })
      .catch((err) => reject(err));
    });
  };

  return { ...calendar, update };
};