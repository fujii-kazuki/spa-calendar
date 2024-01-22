import { useState, useRef } from 'react'
import {
  signUp,
  signIn,
  signOut,
  deleteUser,
  getUser
} from '/src/lib/api/auth'

export const useUser = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // 非同期通信の処理中フラグ
  const isProcess = useRef(false);

  // stateの更新
  const updateState = (stateObj) => {
    setUser({
      ...user,
      ...stateObj
    });
  };

  // 登録
  const register = () => {
    return new Promise((resolve) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;
  
      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // サインアップAPIを叩く
      signUp({
        email: user.email,
        password: user.password
      })
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors.fullMessages;
        alert(errorMessages.join('\n'));
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };

  // ログイン
  const login = () => {
    return new Promise((resolve) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;
  
      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // サインインAPIを叩く
      signIn({
        email: user.email,
        password: user.password
      })
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };

  // ログアウト
  const logout = () => {
    return new Promise((resolve, reject) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;
  
      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // サインアウトAPIを叩く
      signOut()
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
        reject();
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };

  // 退会
  const deleteRegister = () => {
    return new Promise((resolve, reject) => {
      // 非同期通信の処理中ならここで終了
      if (isProcess.current) return;
  
      // 非同期通信の処理中フラグを立てる
      isProcess.current = true;
      // ユーザ削除APIを叩く
      deleteUser()
      .then(resolve)
      .catch((err) => {
        // エラーメッセージのアラートを表示
        const errorMessages = err.response.data.errors;
        alert(errorMessages.join('\n'));
        reject();
      })
      .finally(() => {
        // 非同期通信の処理中フラグを降ろす
        isProcess.current = false;
      });
    });
  };

  // ログイン状態かをtrue/falseで返す
  const isLogin = async() => {
    // ユーザ取得APIを叩いてレスポンスを取得
    const res = await getUser();
    return res.data.isLogin;
  };

  return {
    ...user,
    updateState,
    register,
    login,
    logout,
    deleteRegister,
    isLogin
  };
};