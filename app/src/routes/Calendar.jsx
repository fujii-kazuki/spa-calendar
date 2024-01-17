import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DocumentPlusIcon, DocumentTextIcon, PencilSquareIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

import { signOut, getUser } from '/src/lib/api/auth'
import { getCalendarEvents } from '/src/lib/api/calendarEvent'

import { useCalendarEvent } from '/src/hooks/calendarEvent'
import { useModal } from '../hooks/modal'

import { CreateEventModal } from '/src/components/modals/CreateEventModal'
import { ShowEventModal } from '/src/components/modals/ShowEventModal'
import { EditEventModal } from '/src/components/modals/EditEventModal'

const Calendar = () => {
  const calendarEvent = useCalendarEvent();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const createEventModal = useModal({
    title: '予定を追加',
    closeOnChick: calendarEvent.init
  });
  const showEventModal = useModal({
    title: '予定の詳細',
    width: '800px'
  });
  const editEventModal = useModal({
    title: '予定を編集',
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
    showEventModal.open();

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
        icon={<DocumentPlusIcon className='h-8 w-8' />}
        calendarEvent={calendarEvent}
        updateCalendar={updateCalendar}
      />

      <ShowEventModal
        modal={showEventModal}
        icon={<DocumentTextIcon className='h-8 w-8' />}
        calendarEvent={calendarEvent}
        editEventModal={editEventModal}
      />

      <EditEventModal
        modal={editEventModal}
        icon={<PencilSquareIcon className='h-8 w-8' />}
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
          <button onClick={logout} className='button button-secondary'>
            <ArrowLeftStartOnRectangleIcon className='h-6 w-6' />
            ログアウト
          </button>
          <button onClick={createEventModal.open} className='button'>
            <DocumentPlusIcon className='h-6 w-6' />
            予定を追加
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;