// applyCaseMiddleware = スネークケース/キャメルケースを変換する
import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true // HTTPヘッダーの変換を無効
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_APP_API_DOMAIN
  }),
  options
);

export default client;