import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { PencilSquareIcon, ArrowPathIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

import { signOut, getUser } from '/src/lib/api/auth'
import { getCalendarEvents } from '/src/lib/api/calendarEvent'

import { useCalendarEvent } from '/src/hooks/calendarEvent'
import { useModal } from '../hooks/modal'

import { CreateEventModal } from '/src/components/modals/CreateEventModal'
import { UpdateEventModal } from '/src/components/modals/UpdateEventModal'

const Calendar = () => {
  const calendarEvent = useCalendarEvent();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const createEventModal = useModal({
    title: '予定を追加',
    closeOnChick: calendarEvent.init
  });
  const updateEventModal = useModal({
    title: '予定を更新',
    closeOnChick: calendarEvent.init
  });

  const navigate = useNavigate();

  // 予定を選択時の処理
  const eventClick = (info) => {
    calendarEvent.set({
      id: info.event.id,
      title: info.event.title,
      description: info.event._def.extendedProps.description,
      startDate: dateFormat(info.event.start),
      endDate: dateFormat(info.event.end || info.event.start)
    });

    // 予定更新モーダルを開く
    updateEventModal.open();

    function dateFormat(date) {
      return new Date(date)
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join("-");
    }; 
  };

  // カレンダーを更新
  const updateCalendar = async() => {
    try {
      const res = await getCalendarEvents();
      const calendarEvents = res.data.map((calendarEvent) => {
        return {
          id: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: new Date(calendarEvent.startDate),
          end: new Date(calendarEvent.endDate)
        };
      });
      setCalendarEvents(calendarEvents);
    } catch (e) {
      console.log(e);
    }
  };

  // ログアウト機能
  const logout = async (event) => {
    event.preventDefault();
    await signOut()
      .then((res) => {
        if (res?.data.success) {
          alert('ログアウトしました。');
        } else {
          // エラーメッセージのアラートを表示
          const errorMessages = res.data.errors;
          alert(errorMessages.join('\n'));
        }
        navigate('/');
      })
      .catch(() => {
        alert('ログアウトに失敗しました。');
      })
  };

  // ログイン判定
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (!res?.data.isLogin) {
          navigate('/');
        }
        await updateCalendar();
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  return (
    <>
      <CreateEventModal
        modal={createEventModal}
        icon={<PencilSquareIcon className='h-8 w-8' />}
        calendarEvent={calendarEvent}
        updateCalendar={updateCalendar}
      />

      <UpdateEventModal
        modal={updateEventModal}
        icon={<ArrowPathIcon className='h-8 w-8' />}
        calendarEvent={calendarEvent}
        updateCalendar={updateCalendar}
      />

      <div className='container h-dvh flex flex-col gap-8 justify-center'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale='ja'
          events={calendarEvents}
          headerToolbar={{
            left: 'today',
            center: 'title',
            right: 'prev,next'
          }}
          eventClick={eventClick}
          displayEventTime={false}
          eventDisplay='block'
          editable={true}
          selectable={true}
          height='80vh'
        />
        <div className='flex justify-between'>
          <button onClick={logout} className='button button-secondary flex items-center'>
            <ArrowLeftStartOnRectangleIcon className='h-6 w-6' />
            ログアウト
          </button>
          <button onClick={createEventModal.open} className='button flex items-center'>
            <PencilSquareIcon className='h-6 w-6' />
            予定を追加
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;