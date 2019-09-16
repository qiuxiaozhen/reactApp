import axios from 'axios';
import store from '@/reducers/store';

axios.defaults.withCredentials = true;

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.code === -1) {
    store.dispatch({
      type: 'OPEN',
      payload: {
        type: 'error',
        message: response.data.message,
        isOpen: true,
      },
    });
    if (response.data.message === '没有权限') {
      window.location.href = 'http://localhost:9000/login';
    }
  }
  return response;
}, error => Promise.reject(error));

class Http {
  static get(url, params) {
    return axios.get(url, {
      params,
    });
  }

  static post(url, params) {
    return axios.post(url, params);
  }
}

export default Http;
