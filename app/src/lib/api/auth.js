import Cookies from 'js-cookie'
import client from './client'

// サインアップ
export const signUp = async (params) => {
  return await client.post('auth', params)
    .then((res) => {
      Cookies.set('_access_token', res.headers['access-token']);
      Cookies.set('_client', res.headers['client']);
      Cookies.set('_uid', res.headers['uid']);
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
      Cookies.set('_access_token', res.headers['access-token']);
      Cookies.set('_client', res.headers['client']);
      Cookies.set('_uid', res.headers['uid']);
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

// サインアウト
export const signOut = async () => {
  return await client.delete('auth/sign_out', {
      headers: {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      }
    }).then((res) => {
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

// ログイン済みのユーザーを返す
export const getUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};