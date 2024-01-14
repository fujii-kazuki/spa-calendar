import { Link } from 'react-router-dom'

const Calendar = () => {
  return (
    <div className='container'>
      <h1 className='text-4xl'>カレンダーページ</h1>
      <Link to="/">ホーム画面に戻る</Link>
    </div>
  );
};

export default Calendar;