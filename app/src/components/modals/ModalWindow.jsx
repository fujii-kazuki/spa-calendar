import Modal from 'react-modal'
import { XMarkIcon } from '@heroicons/react/24/outline'

Modal.setAppElement('#root');

export const ModalWindow = ({
  modal,
  icon,
  title = 'No title',
  width = '600px',
  closeOnClick,
  children
}) => {
  return (
    <Modal
      isOpen={modal.isOpen}
      style={{ content: { width: width } }}
      className='bg-white rounded-lg shadow-xl'
      overlayClassName='fixed top-0 left-0 w-full h-dvh flex items-center justify-center bg-black bg-opacity-10 backdrop-blur z-50'
      closeTimeoutMS={400}
    >
      <div className='flex items-center justify-between p-6 border-b'>
        <h2 className='text-2xl flex gap-1 items-center'>
          { icon }
          { title }
        </h2>
        <button className='text-gray-400 bg-gray-100 rounded-lg transition-all hover:bg-gray-200 hover:text-gray-900'
          onClick={() => {
            modal.close();
            if (typeof closeOnClick == 'function') closeOnClick();
          }}
        >
          <XMarkIcon className='h-8 w-8' />
        </button>
      </div>
      <div className='space-y-6 p-8'>
        { children }
      </div>
    </Modal>
  );
};