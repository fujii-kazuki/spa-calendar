import { ModalWindow } from '/src/components/modals/ModalWindow'
import { CalendarEventForm } from '/src/components/forms/CalendarEventForm'
import { DocumentPlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export const CreateEventModal = ({ modal, calendar, calendarEvent }) => {
  // 予定を作成
  const createCalendarEvent = async (event) => {
    event.preventDefault();
    await calendarEvent.create(); //予定作成のAPIを叩く
    await calendar.update();      //予定作成後、カレンダーを更新
    await modal.close();          //カレンダー更新後、モーダルを閉じる
    calendarEvent.initState();    //モーダルが閉じ切った後、予定のstateを初期化
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
