import { useRef } from 'react'

import { PencilSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { updateCalendarEvent } from '/src/lib/api/calendarEvent'

import { ModalWindow } from '/src/components/modals/ModalWindow'
import { CalendarEventForm } from '/src/components/forms/CalendarEventForm'

export const EditEventModal = ({ modal, calendarEvent, updateCalendar }) => {
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
    <ModalWindow
      modal={modal}
      icon={<PencilSquareIcon className='h-8 w-8' />}
      title='予定を編集'
      closeOnClick={calendarEvent.init}
    >
      <CalendarEventForm
        calendarEvent={calendarEvent}
        onSubmit={updateEvent}
      >
        <button type='submit' className='button button-success !mt-10 ml-auto'>
          <ArrowPathIcon className='h-6 w-6' />
          更新
        </button>
      </CalendarEventForm>
    </ModalWindow>
  );
};