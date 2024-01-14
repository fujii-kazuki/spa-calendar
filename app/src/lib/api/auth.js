import Cookies from 'js-cookie'
import Client from './client'

// サインアップ
export const SignUp = async (params) => {
  return await Client.post('auth', params)
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
export const SignIn = async (params) => {
  return await Client.post('auth/sign_in', params)
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

// ログイン済みのユーザーを返す
export const GetUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return Client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid'),
    },
  });
};