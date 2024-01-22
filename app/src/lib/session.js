import Cookies from 'js-cookie'

const session = {
  headers: () => {
    return {
      'access-token': Cookies.get('_access_token'),
      'client': Cookies.get('_client'),
      'uid': Cookies.get('_uid')
    };
  },

  cookies: {
    set: (values) => {
      Cookies.set('_access_token', values['access-token']);
      Cookies.set('_client', values['client']);
      Cookies.set('_uid', values['uid']);
    },

    remove: () => {
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
    }
  }
};

export default session;