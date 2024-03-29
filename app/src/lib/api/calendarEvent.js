import client from './client'
import session from '../session'

// 全ての予定を配列で取得
export const getCalendarEvents = () => {
  return client.get('/calendar_events', {
    headers: session.headers()
  });
};

// 予定作成
export const createCalendarEvent = (params) => {
  return client.post('/calendar_events', params, {
    headers: session.headers()
  });
};

// 予定更新
export const updateCalendarEvent = (params) => {
  return client.patch(`/calendar_events/${params.id}`, params, {
    headers: session.headers()
  });
};

// 予定削除
export const destroyCalendarEvent = (params) => {
  return client.delete(`/calendar_events/${params.id}`, {
    headers: session.headers()
  });
};