import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// カスタムフック
import { useUser } from '/src/hooks/user'
// コンポーネント
import { Form } from '/src/components/forms/Form'
// 画像
import topImage from '/src/assets/images/top.svg'

const SignUp = () => {
  const user = useUser();
  const navigate = useNavigate();

  // ユーザーを登録
  const registerUser = async (event) => {
    event.preventDefault();
    await user.register();  //ユーザー登録APIを叩く
    navigate('/calendar');  //登録後、カレンダーページへ遷移
  };

  useEffect(() => {
    const f = async () => {
      // ログイン状態ならカレンダーページ遷移
      if (await user.isLogin()) navigate('/calendar');
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
        <h2 className='text-2xl'>ユーザー登録</h2>

        <Form onSubmit={registerUser}>
          <input type="email" name="email" placeholder='メールアドレス' autoFocus
            onChange={(event) => user.updateState({ email: event.target.value })}
          />

          <input type="password" name="password" placeholder='パスワード'
            onChange={(event) => user.updateState({ password: event.target.value })}
          />

          <button type="submit" className='button !mt-10 mx-auto'>
            登録
          </button>
        </Form>

        <div className='text-right'>
          <Link to='/'>ログインはこちら</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;