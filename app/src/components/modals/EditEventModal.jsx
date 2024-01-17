import { useRef } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ColorPicker } from '/src/components/ColorPicker'
import { ModalWindow } from '/src/components/modals/ModalWindow'
import { updateCalendarEvent } from '/src/lib/api/calendarEvent'

export const EditEventModal = ({ modal, icon, calendarEvent, updateCalendar }) => {
  const isProc = useRef(false); //送信処理の管理

  // 予定を更新
  const updateEvent = async (event) => {
    event.preventDefault();

    if (isProc.current) return;
    isProc.current = true;

    await updateCalendarEvent({
      id: calendarEvent.id,
      title: calendarEvent.title,
      description: calendarEvent.description,
      startDate: calendarEvent.startDate,
      endDate: calendarEvent.endDate,
      color: calendarEvent.color
    })
    .then(() => {
      updateCalendar().then(() => {
        modal.close();
        calendarEvent.init();
      });
    })
    .catch((err) => {
      // エラーメッセージのアラートを表示
      const errorMessages = err.response.data.errors;
      alert(errorMessages.join('\n'));
    })
    .finally(() => {
      isProc.current = false;
    });
  };

  return (
    <ModalWindow modal={modal} icon={icon}>
      <form onSubmit={updateEvent}>
        <div className='space-y-6'>
          <input type='text' name='title' placeholder='タイトル' autoFocus
            value={calendarEvent.title}
            onChange={(event) => calendarEvent.set({ title: event.target.value })}
          />
          <input type='text' name='description' placeholder='説明'
            value={calendarEvent.description}
            onChange={(event) => calendarEvent.set({ description: event.target.value })}
          />
          <div>
            <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
            <input type='date' name='description' id='startDate'
              value={calendarEvent.startDate}
              onChange={(event) => calendarEvent.set({ startDate: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
            <input type='date' name='description' id='endDate'
              value={calendarEvent.endDate}
              onChange={(event) => calendarEvent.set({ endDate: event.target.value })}
            />
          </div>
          <div className='flex gap-5 items-center'>
            <label className='font-ZenKurenaido font-extrabold'>色</label>
            <ColorPicker calendarEvent={calendarEvent} />
          </div>
        </div>
        <button type='submit' className='button button-success mt-10 ml-auto'>
          <ArrowPathIcon className='h-6 w-6' />
          更新
        </button>
      </form>
    </ModalWindow>
  );
};