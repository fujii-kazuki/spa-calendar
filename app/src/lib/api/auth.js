import client from './client'
import session from '../session'

// サインアップ
export const signUp = async (params) => {
  return await client.post('auth', params)
    .then((res) => {
      session.cookies.set(res.headers);
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

// サインイン
export const signIn = async (params) => {
  return await client.post('auth/sign_in', params)
    .then((res) => {
      session.cookies.set(res.headers);
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

// サインアウト
export const signOut = async () => {
  return await client.delete('auth/sign_out', {
      headers: session.headers()
    }).then((res) => {
      session.cookies.remove();
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

// 登録削除
export const deleteRegister = async () => {
  return await client.delete('auth', {
    headers: session.headers()
  }).then((res) => {
    session.cookies.remove();
    return res;
  })
  .catch((err) => {
    return err.response;
  })
}

// ログイン済みのユーザーを返す
export const getUser = () => {
  if (!session.cookies.isExist()) return;

  return client.get('/auth/sessions', {
    headers: session.headers()
  });
};