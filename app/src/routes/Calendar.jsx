import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { PencilSquareIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut, getUser } from '/src/lib/api/auth'
import { getCalendarEvents } from '/src/lib/api/calendarEvent';
import { CreateEventModal } from '/src/components/CreateEventModal'
import { UpdateEventModal } from '/src/components/UpdateEventModal'

const Calendar = () => {
  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);
  const [updateEventModalIsOpen, setUpdateEventModalIsOpen] = useState(false);

  const [events, setEvents] = useState();
  const [updateTitle, setTitle] = useState('');
  const [updateDescription, setDescription] = useState('');
  const [updateStartDate, setStartDate] = useState('');
  const [updateEndDate, setEndDate] = useState('');
  const [eventId, setEventId] = useState('');

  const navigate = useNavigate();

  const clearEvents = async() => {
    try {
      const res = await getCalendarEvents();
      const calendarEvents = res.data.map((calendarEvent) => {
        return {
          eventId: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: new Date(calendarEvent.startDate),
          end: new Date(calendarEvent.endDate)
        };
      });
      setEvents(calendarEvents);
    } catch (e) {
      console.log(e);
    }
  };

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
        await clearEvents();
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  const eventClick = (info) => {
    setTitle(info.event.title);
    setDescription(info.event._def.extendedProps.description);
    setStartDate(dateFormat(info.event.start));
    setEndDate(dateFormat(info.event.end || info.event.start));
    setEventId(info.event._def.extendedProps.eventId);
    setUpdateEventModalIsOpen(true);

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

  return (
    <>
      <CreateEventModal
        isOpen={createEventModalIsOpen}
        setIsOpen={setCreateEventModalIsOpen}
        clearEvents={clearEvents}
      />

      <UpdateEventModal
        isOpen={updateEventModalIsOpen}
        setIsOpen={setUpdateEventModalIsOpen}
        eventUseStatus={{
          title: updateTitle,
          setTitle: setTitle,
          description: updateDescription,
          setDescription: setDescription,
          startDate: updateStartDate,
          setStartDate: setStartDate,
          endDate: updateEndDate,
          setEndDate: setEndDate,
          eventId: eventId,
          setEventId: setEventId
        }}
        clearEvents={clearEvents}
      />

      <div className='container h-dvh flex flex-col gap-8 justify-center'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale='ja'
          events={events}
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
          <button onClick={() => setCreateEventModalIsOpen(true)} className='button flex items-center'>
            <PencilSquareIcon className='h-6 w-6' />
            予定を追加
          </button>
        </div>
      </div>
    </>
  );
};

export default Calendar;