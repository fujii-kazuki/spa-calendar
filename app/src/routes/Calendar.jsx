import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '/src/lib/api/auth'
import { getCalendarEvents } from '/src/lib/api/calendarEvent';
import { CreateEventModal } from '/src/components/CreateEventModal'

const Calendar = () => {
  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);

  const [events, setEvents] = useState();
  const navigate = useNavigate();

  const clearEvents = async() => {
    try {
      const res = await getCalendarEvents();
      const calendarEvents = res.data.map((calendarEvent) => {
        return {
          eventId: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: calendarEvent.startDate,
          end: calendarEvent.endDate
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

  return (
    <>
      <CreateEventModal
        isOpen={createEventModalIsOpen}
        setIsOpen={setCreateEventModalIsOpen}
        clearEvents={clearEvents}
      />
      <div className='container'>
        <h1 className='text-4xl'>カレンダーページ</h1>
        <button onClick={logout}>ログアウト</button>
        <button onClick={() => setCreateEventModalIsOpen(true)}>予定を追加</button>
      </div>
    </>
  );
};

export default Calendar;