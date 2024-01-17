import { useRef } from 'react'
import { ModalWindow } from '/src/components/modals/ModalWindow'
import { PencilSquareIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { destroyCalendarEvent } from '/src/lib/api/calendarEvent'

export const ShowEventModal = ({ modal, icon, calendarEvent, editEventModal, updateCalendar }) => {
  const isProc = useRef(false); //送信処理の管理

  const eventDestroy = async () => {
    if (window.confirm('この予定を削除しますします。よろしいですか？')) {
      if (isProc.current) return;
      isProc.current = true;

      await destroyCalendarEvent({
        id: calendarEvent.id
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
    }
  };

  return (
    <ModalWindow modal={modal} icon={icon}>
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
      <div className='flex justify-between mt-10'>
        <button type='button' className='button button-danger button-rounded'
          onClick={eventDestroy}
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
  );
};