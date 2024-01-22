import { ModalWindow } from '/src/components/modals/ModalWindow'
import { CalendarEventForm } from '/src/components/forms/CalendarEventForm'
import { PencilSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export const EditEventModal = ({ modal, calendar, calendarEvent }) => {
  // 予定を更新
  const updateCalendarEvent = (event) => {
    event.preventDefault();
    // 予定更新成功後の処理
    const callback = () => {
      calendar.update(() => {
        modal.close();
        calendarEvent.initState();
      });
    };
    calendarEvent.update(callback);
  };

  return (
    <ModalWindow
      modal={modal}
      icon={<PencilSquareIcon className='h-8 w-8' />}
      title='予定を編集'
      closeOnClick={calendarEvent.initState}
    >
      <CalendarEventForm
        calendarEvent={calendarEvent}
        onSubmit={updateCalendarEvent}
      >
        <button type='submit' className='button button-success !mt-10 ml-auto'>
          <ArrowPathIcon className='h-6 w-6' />
          更新
        </button>
      </CalendarEventForm>
    </ModalWindow>
  );
};