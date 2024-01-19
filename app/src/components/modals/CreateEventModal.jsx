import { useRef } from 'react'

import { DocumentPlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { createCalendarEvent } from '/src/lib/api/calendarEvent'

import { ModalWindow } from '/src/components/modals/ModalWindow'
import { CalendarEventForm } from '/src/components/forms/CalendarEventForm'

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
      <CalendarEventForm
        calendarEvent={calendarEvent}
        onSubmit={createEvent}
      >
        <button type='submit' className='button button-success !mt-10 ml-auto'>
          <PlusCircleIcon className='h-6 w-6' />
          追加
        </button>
      </CalendarEventForm>
    </ModalWindow>
  );
};
