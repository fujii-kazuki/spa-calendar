import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// npm「FullCalendar」
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// カスタムフック
import { useCalendar } from '/src/hooks/calendar'
import { useCalendarEvent } from '/src/hooks/calendarEvent'
import { useUser } from '/src/hooks/user'
import { useModal } from '/src/hooks/modal'
// コンポーネント
import { CreateEventModal } from '/src/components/modals/CreateEventModal'
import { ShowEventModal } from '/src/components/modals/ShowEventModal'
// アイコン
import {
  DocumentPlusIcon,
  ArrowLeftStartOnRectangleIcon,
  UserMinusIcon
} from '@heroicons/react/24/outline'

const Calendar = () => {
  const calendar = useCalendar();
  const calendarEvent = useCalendarEvent();
  const user = useUser();
  const createEventModal = useModal();
  const showEventModal = useModal();

  const navigate = useNavigate();

  // 予定を選択時の処理
  const eventClick = (info) => {
    // 予定のstateを更新
    calendarEvent.updateState({
      id: info.event.id,
      title: info.event.title,
      description: info.event._def.extendedProps.description,
      startDate: dateFormat(info.event.start),
      endDate: dateFormat(info.event.end || info.event.start),
      color: info.event.classNames[0]
    });
    // 予定更新モーダルを開く
    showEventModal.open();

    function dateFormat(date) {
      return new Date(date)
        .toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .join('-');
    }; 
  };

  // ログアウト
  const logout = async (event) => {
    event.preventDefault();
    if (window.confirm('ログアウトします。よろしいですか？')) {
      try {
        await user.logout();  //ログアウトAPIを叩く
        navigate('/');        //ログアウト後、トップページへ遷移
      } catch {
        navigate('/');
      }
    }
  };

  // ユーザーを削除
  const deleteUser = async (event) => {
    event.preventDefault();
    if (window.confirm('アカウントを削除します。登録した予定は全て削除されてしまいますが、よろしいですか？')) {
      try {
        await user.deleteRegister();
        alert('アカウントの削除が完了しました。またのご利用をお待ちしております。');
        navigate('/');
      } catch {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    const f = async () => {
      // ログイン状態ならカレンダーを更新
      // ログイン状態でなければトップページへ遷移
      await user.isLogin() ? calendar.update() : navigate('/');
    };
    f();
  }, [navigate]);

  return (
    <>
      <CreateEventModal
        modal={createEventModal}
        calendar={calendar}
        calendarEvent={calendarEvent}
      />

      <ShowEventModal
        modal={showEventModal}
        calendar={calendar}
        calendarEvent={calendarEvent}
      />

      <div className='container h-dvh flex flex-col gap-8 justify-center'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale='ja'
          events={calendar.events}
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
        <div className='flex items-center justify-between'>
          <div className='flex gap-5 items-center'>
            <button onClick={deleteUser} className='button button-danger button-rounded'>
              <UserMinusIcon className='h-6 w-6' />
            </button>
            <button onClick={logout} className='button button-secondary button-rounded'>
              <ArrowLeftStartOnRectangleIcon className='h-6 w-6' />
            </button>
          </div>

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