import { useState } from 'react'
import { getCalendarEvents } from '/src/lib/api/calendarEvent'

export const  useCalendar = () => {
  const [calendar, setCalendar] = useState({
    events: []
  });

  // 更新
  const update = async (callback) => {
    // 予定取得のAPIを叩く
    await getCalendarEvents()
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
      // コールバック関数を実行
      if (typeof callback == 'function') callback();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return { ...calendar, update };
};