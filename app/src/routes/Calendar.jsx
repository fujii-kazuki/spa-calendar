import { useNavigate } from 'react-router-dom'
import { signOut } from '/src/lib/api/auth'

const Calendar = () => {
  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    await signOut()
      .then((res) => {
        if (res?.data.success) {
          alert('ログアウトしました。');
        } else {
          // エラーメッセージのアラートを表示
          const errorMessage = res.data.errors[0];
          alert(errorMessage);
        }
        navigate('/');
      })
      .catch(() => {
        alert('ログアウトに失敗しました。');
      })
  };

  return (
    <div className='container'>
      <h1 className='text-4xl'>カレンダーページ</h1>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Calendar;