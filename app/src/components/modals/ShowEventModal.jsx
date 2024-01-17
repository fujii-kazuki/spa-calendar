import { ModalWindow } from '/src/components/modals/ModalWindow'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

export const ShowEventModal = ({ modal, icon, calendarEvent, editEventModal }) => {
  return (
    <ModalWindow modal={modal} icon={icon}>
      <div className='font-ZenKurenaido space-y-5'>
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
      <button type='button' className='button mt-8 ml-auto'
        onClick={() => {
          modal.close();
          editEventModal.open();
        }}
      >
        <PencilSquareIcon className='h-6 w-6' />
        予定を編集
      </button>
    </ModalWindow>
  );
};