import Modal from 'react-modal'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { updateCalendarEvent } from '/src/lib/api/calendarEvent'

Modal.setAppElement('#root');

export const UpdateEventModal = ({isOpen, setIsOpen, eventUseStatus, clearEvents}) => {
  const updateEvent = async (event) => {
    await updateCalendarEvent({
      title: eventUseStatus.title,
      description: eventUseStatus.description,
      startDate: eventUseStatus.startDate,
      endDate: eventUseStatus.endDate,
      calendarEventId: eventUseStatus.eventId
    }).then(() => {
      clearEvents().then(() => {
        setIsOpen(false);
      });
    })
    .catch((err) => {
      // エラーメッセージのアラートを表示
      const errorMessages = err.response.data.errors;
      alert(errorMessages.join('\n'));
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      className='bg-white rounded-lg shadow-xl w-[600px]'
      overlayClassName='fixed top-0 left-0 w-full h-dvh flex items-center justify-center bg-black bg-opacity-10 backdrop-blur z-50'
      closeTimeoutMS={400}
    >
      <div className='flex items-center justify-between p-6 border-b'>
        <h1 className='text-2xl flex items-center'>
          <PencilSquareIcon className='h-8 w-8' />
          予定を更新
        </h1>
        <button className='text-gray-400 bg-gray-100 rounded-lg transition-all hover:bg-gray-200 hover:text-gray-900'
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className='h-8 w-8' />
        </button>
      </div>
      <div className='p-8'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateEvent();
          }}
        >
          <div className='space-y-5'>
            <input type='text' name='title' placeholder='タイトル' autoFocus
              value={eventUseStatus.title}
              onChange={(event) => eventUseStatus.setTitle(event.target.value)}
            />
            <input type='text' name='description' placeholder='説明'
              value={eventUseStatus.description}
              onChange={(event) => eventUseStatus.setDescription(event.target.value)}
            />
            <div>
              <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
              <input type='date' name='description' id='startDate'
                value={eventUseStatus.startDate}
                onChange={(event) => eventUseStatus.setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
              <input type='date' name='description' id='endDate'
                value={eventUseStatus.endDate}
                onChange={(event) => eventUseStatus.setEndDate(event.target.value)}
              />
            </div>
          </div>
          <button type='submit' className='button mt-8 ml-auto'>
            更新
          </button>
        </form>
      </div>
    </Modal>
  );
};