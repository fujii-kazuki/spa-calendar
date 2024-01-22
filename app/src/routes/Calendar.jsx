import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DocumentPlusIcon, ArrowLeftStartOnRectangleIcon, UserMinusIcon } from '@heroicons/react/24/outline'

import { signOut, deleteRegister, getUser } from '/src/lib/api/auth'

import { useCalendar } from '/src/hooks/calendar'
import { useCalendarEvent } from '/src/hooks/calendarEvent'
import { useModal } from '../hooks/modal'

import { CreateEventModal } from '/src/components/modals/CreateEventModal'
import { ShowEventModal } from '/src/components/modals/ShowEventModal'

const Calendar = () => {
  const calendar = useCalendar();
  const calendarEvent = useCalendarEvent();
  const createEventModal = useModal();
  const showEventModal = useModal();

  const navigate = useNavigate();

  // 予定を選択時の処理
  const eventClick = (info) => {
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

  // ログアウト機能
  const logout = async (event) => {
    event.preventDefault();
    if (window.confirm('ログアウトします。よろしいですか？')) {
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
    }
  };

  // アカウント削除機能
  const deleteAccount = async (event) => {
    event.preventDefault();
    if (window.confirm('アカウントを削除します。登録した予定は全て削除されてしまいますが、よろしいですか？')) {
      await deleteRegister()
        .then((res) => {
          if (res?.data.status === 'success') {
            alert('アカウントの削除が完了しました。またのご利用をお待ちしております。');
            navigate('/');
          } else if (res?.data.status === 'error') {
            // エラーメッセージのアラートを表示
            const errorMessages = res.data.errors;
            alert(errorMessages.join('\n'));
          }
        })
        .catch(() => {
          alert('アカウント削除に失敗しました。');
        })
    }
  };

  // ログイン判定
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (!res?.data.isLogin) {
          navigate('/');
        }
        await calendar.update();
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
            <button onClick={deleteAccount} className='button button-danger button-rounded'>
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