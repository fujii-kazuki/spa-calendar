import { useModal } from '/src/hooks/modal'
import { ModalWindow } from '/src/components/modals/ModalWindow'
import { EditEventModal } from '/src/components/modals/EditEventModal'
import { DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export const ShowEventModal = ({ modal, calendarEvent, updateCalendar }) => {
  const editEventModal = useModal();

  const destroyCalendarEvent = () => {
    if (window.confirm('この予定を削除します。よろしいですか？')) {
      // 予定削除成功後の処理
      const callback = () => {
        updateCalendar().then(() => {
          modal.close();
          calendarEvent.initState();
        });
      };
      calendarEvent.destroy(callback);
    }
  };

  return (
    <>
      <ModalWindow
        modal={modal}
        icon={<DocumentTextIcon className='h-8 w-8' />}
        title='予定の詳細'
        width='800px'
        closeOnClick={calendarEvent.initState}
      >
        <div className='font-ZenKurenaido space-y-6'>
          <div>
            <h3 className='mb-1'>タイトル</h3>
            <p className='text-lg border-b-[1.5px] border-gray-400 mx-2 px-2'>
              {calendarEvent.title}
            </p>
          </div>

          <div>
            <h3 className='mb-1'>説明</h3>
            <p className='text-lg border-b-[1.5px] border-gray-400 mx-2 px-2'>
              {calendarEvent.description ? calendarEvent.description : '無し'}
            </p>
          </div>

          <div>
            <h3 className='mb-1'>期間</h3>
            <div className='flex items-end'>
              <p className='text-lg border-b-[1.5px] border-gray-400 mx-2 px-2'>
                {calendarEvent.startDate}
              </p>

              {calendarEvent.startDate !== calendarEvent.endDate
                ? <>
                    <p>から</p>
                    <p className='text-lg border-b-[1.5px] border-gray-400 mx-2 px-2'>
                      {calendarEvent.endDate}
                    </p>
                    <p>まで</p>
                  </>
                : <></>
              }
            </div>
          </div>
        </div>

        <div className='flex justify-between !mt-10'>
          <button type='button' className='button button-danger button-rounded'
            onClick={destroyCalendarEvent}
          >
            <TrashIcon className='h-6 w-6' />
          </button>

          <button type='button' className='button'
            onClick={() => {
              modal.close();
              editEventModal.open();
            }}
          >
            <PencilSquareIcon className='h-6 w-6' />
            予定を編集
          </button>
        </div>
      </ModalWindow>

      <EditEventModal
        modal={editEventModal}
        calendarEvent={calendarEvent}
        updateCalendar={updateCalendar}
      />
    </>
  );
};