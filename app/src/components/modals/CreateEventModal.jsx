import { ModalWindow } from '/src/components/modals/ModalWindow'
import { CalendarEventForm } from '/src/components/forms/CalendarEventForm'
import { DocumentPlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export const CreateEventModal = ({ modal, calendarEvent, updateCalendar }) => {
  // 予定を作成
  const createCalendarEvent = (event) => {
    event.preventDefault();
    // 予定作成成功後の処理
    const callback = () => {
      updateCalendar().then(() => {
        modal.close();
        calendarEvent.initState();
      });
    };
    calendarEvent.create(callback);
  };

  return (
    <ModalWindow
      modal={modal}
      icon={<DocumentPlusIcon className='h-8 w-8' />}
      title='予定を追加'
      closeOnClick={calendarEvent.initState}
    >
      <CalendarEventForm
        calendarEvent={calendarEvent}
        onSubmit={createCalendarEvent}
      >
        <button type='submit' className='button button-success !mt-10 ml-auto'>
          <PlusCircleIcon className='h-6 w-6' />
          追加
        </button>
      </CalendarEventForm>
    </ModalWindow>
  );
};
