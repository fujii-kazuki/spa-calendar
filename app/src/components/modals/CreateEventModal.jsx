import { useRef } from 'react'

import { DocumentPlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { createCalendarEvent } from '/src/lib/api/calendarEvent'

import { ModalWindow } from '/src/components/modals/ModalWindow'
import { ColorPicker } from '/src/components/ColorPicker'

export const CreateEventModal = ({ modal, calendarEvent, updateCalendar }) => {
  const isProc = useRef(false); //送信処理の管理

  // 予定を作成
  const createEvent = async (event) => {
    event.preventDefault();

    if (isProc.current) return;
    isProc.current = true;

    await createCalendarEvent({
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
    <ModalWindow
      modal={modal}
      icon={<DocumentPlusIcon className='h-8 w-8' />}
      title='予定を追加'
      closeOnClick={calendarEvent.init}
    >
      <form onSubmit={createEvent}>
        <div className='space-y-6'>
          <input type='text' name='title' placeholder='タイトル' autoFocus
            onChange={(event) => calendarEvent.set({ title: event.target.value })}
          />
          <input type='text' name='description' placeholder='説明'
            onChange={(event) => calendarEvent.set({ description: event.target.value })}
          />
          <div>
            <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
            <input type='date' name='description' id='startDate'
              onChange={(event) => calendarEvent.set({ startDate: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
            <input type='date' name='description' id='endDate'
              onChange={(event) => calendarEvent.set({ endDate: event.target.value })}
            />
          </div>
          <div className='flex gap-5 items-center'>
            <label className='font-ZenKurenaido font-extrabold'>色</label>
            <ColorPicker calendarEvent={calendarEvent} />
          </div>
        </div>
        <button type='submit' className='button button-success mt-10 ml-auto'>
          <PlusCircleIcon className='h-6 w-6' />
          追加
        </button>
      </form>
    </ModalWindow>
  );
};
