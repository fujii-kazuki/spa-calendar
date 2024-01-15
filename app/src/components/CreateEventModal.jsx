import { useState } from 'react'
import Modal from 'react-modal'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { createCalendarEvent } from '/src/lib/api/calendarEvent'

Modal.setAppElement('#root');

export const CreateEventModal = ({ isOpen, setIsOpen, clearEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const clearEvent = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  const createEvent = async (event) => {
    await createCalendarEvent({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate
    }).then(() => {
      clearEvents().then(() => {
        setIsOpen(false);
        clearEvent();
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
      overlayClassName='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur'
      closeTimeoutMS={400}
    >
      <div className='flex items-center justify-between p-6 border-b'>
        <h1 className='text-2xl flex items-center'>
          <PencilSquareIcon className='h-8 w-8' />
          予定を追加
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
            createEvent({ title, description, startDate, endDate });
          }}
        >
          <div className='space-y-5'>
            <input type='text' name='title' placeholder='タイトル' autoFocus
              onChange={(event) => setTitle(event.target.value)}
            />
            <input type='text' name='description' placeholder='説明'
              onChange={(event) => setDescription(event.target.value)}
            />
            <div>
              <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
              <input type='date' name='description' id='startDate'
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
              <input type='date' name='description' id='endDate'
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
          <button type='submit' className='button mt-8 ml-auto'>
            追加
          </button>
        </form>
      </div>
    </Modal>
  );
};