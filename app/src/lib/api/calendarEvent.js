import Cookies from 'js-cookie'
import client from './client'

// 予定一覧
export const getCalendarEvents = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return client.get('/calendar_events', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid')
    }
  });
};

// 予定作成
export const createCalendarEvent = (params) => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return client.post('/calendar_events', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid')
    }
  });
};

// 予定更新
export const updateCalendarEvent = (params) => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return client.patch(`/calendar_events/${params.id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid')
    }
  });
};

// 予定削除
export const destroyCalendarEvent = (params) => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) return;

  return client.delete(`/calendar_events/${params.id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid')
    }
  });
};