import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { signIn, getUser } from '/src/lib/api/auth'
import topImage from '/src/assets/images/top.svg'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    await signIn({ email, password })
      .then((res) => {
        if (res?.status === 200) {
          navigate('/calendar');
        } else {
          // エラーメッセージのアラートを表示
          const errorMessages = res.data.errors;
          alert(errorMessages.join('\n'));
        }
      })
      .catch(() => {
        alert('ログインに失敗しました。');
      })
  };

  // ログイン済み判定
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (res?.data.isLogin) {
          navigate('calendar');
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  return (
    <div className='container flex justify-center items-center gap-8 h-dvh'>
      <div className='flex-1'>
        <h1 className='text-4xl text-center pt-12'>SPAカレンダー</h1>
        <img src={topImage} className='object-cover select-none' />
      </div>

      <div className='flex-1 max-w-[600px] space-y-8'>
        <h2 className='text-2xl'>ログイン</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            login();
          }}
        >
          <div className='space-y-5'>
            <input type='email' name='email' placeholder='メールアドレス'
              onChange={(event) => setEmail(event.target.value)}
            />
            <input type='password' name='password' placeholder='パスワード'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type='submit' className='button mt-8 mx-auto'>
            ログイン
          </button>
        </form>

        <div className='text-right'>
          <Link to='/sign-up'>ユーザー登録はこちら</Link>
        </div>
      </div>
    </div>
  );
};

export default App;