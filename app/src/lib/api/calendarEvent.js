import client from './client'
import session from '../session'

// 予定一覧
export const getCalendarEvents = () => {
  if (!session.cookies.isExist()) return;

  return client.get('/calendar_events', {
    headers: session.headers()
  });
};

// 予定作成
export const createCalendarEvent = (params) => {
  if (!session.cookies.isExist()) return;

  return client.post('/calendar_events', params, {
    headers: session.headers()
  });
};

// 予定更新
export const updateCalendarEvent = (params) => {
  if (!session.cookies.isExist()) return;

  return client.patch(`/calendar_events/${params.id}`, params, {
    headers: session.headers()
  });
};

// 予定削除
export const destroyCalendarEvent = (params) => {
  if (!session.cookies.isExist()) return;

  return client.delete(`/calendar_events/${params.id}`, {
    headers: session.headers()
  });
};