import client from './client'
import session from '../session'

// サインアップ
export const signUp = async (params) => {
  return await client.post('auth', params)
    .then((res) => {
      session.cookies.set(res.headers);
      return res;
    });
};

// サインイン
export const signIn = async (params) => {
  return await client.post('auth/sign_in', params)
    .then((res) => {
      session.cookies.set(res.headers);
      return res;
    });
};

// サインアウト
export const signOut = async () => {
  return await client.delete('auth/sign_out', {
      headers: session.headers()
    })
    .then((res) => {
      session.cookies.remove();
      return res;
    });
};

// ユーザー削除
export const deleteUser = async () => {
  return await client.delete('auth', {
      headers: session.headers()
    })
    .then((res) => {
      session.cookies.remove();
      return res;
    });
}

// ユーザー取得
export const getUser = () => {
  return client.get('/auth/sessions', {
    headers: session.headers()
  });
};