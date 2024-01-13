import { Link } from 'react-router-dom'
import topImage from '/src/assets/images/top.svg';

const App = () => {
  return (
    <div className='container flex justify-center items-center gap-8 h-screen'>
      <div className='flex-1'>
        <h1 className='text-4xl text-center pt-12'>SPAカレンダー</h1>
        <img src={topImage} className='object-cover' />
      </div>

      <div className='flex-1 max-w-[600px] space-y-8'>
        <h2 className='text-2xl'>ログイン</h2>
        <form>
          <div className='space-y-5'>
            <input type="email" name="email" placeholder='メールアドレス' />
            <input type="password" name="password" placeholder='パスワード' />
          </div>
          <button type="submit" className='btn mt-8 mx-auto'>ログイン</button>
        </form>

        <div className='text-right'>
          <Link to='/signUp'>ユーザー登録はこちら</Link>
        </div>
      </div>
    </div>
  );
};

export default App;