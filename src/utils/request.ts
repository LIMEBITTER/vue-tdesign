import axios from 'axios';
import proxy from '../config/host';

const env = import.meta.env.MODE || 'development';

const API_HOST = env === 'mock' ? '/' : proxy[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001,
};

const instance = axios.create({
  baseURL: 'https://frp.kawaiimoe.cn/api',
  timeout: 1000,
  withCredentials: true,
});

// eslint-disable-next-line
// @ts-ignore
// axios的retry ts类型有问题
instance.interceptors.retry = 3;

// instance.interceptors.request.use((config) => config);
// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use((
  config) => {
  // 判断token是否存在
  if (localStorage.getItem('token')) {
    console.log('执行了request.ts')
    // 在请求头中添加token
    config.headers.token = localStorage.getItem('token');
    console.log(config.headers)
  }
  return config;
},
error => Promise.reject(error));


instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }
      return response;
    }
  },
  (err) => {
    const { config } = err;

    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  },
);


function request(config) {
  let { url, data, method, headers } = config
  url = url || ''
  data = data || {}
  method = method || 'GET'
  headers = headers || ''
  console.log(headers)

  // restful api  GET / POST /PUT/PATCH/DELETE
  switch (method.toUpperCase()) {
  case 'GET':
    return instance.get(url, { params: data })
  case 'POST':
    // 表单提交  application/x-www-form-url-encoded
    if (headers['content-type'] === 'application/x-www-form-url-encoded') {
      // 转参数 URLSearchParams/第三方库qs
      const p = new URLSearchParams()
      for (const key in data) {
        p.append(key, data[key])
      }
      return instance.post(url, p, { headers })
    }
    // 文件提交  multipart/form-data
    if (headers['content-type'] === 'multipart/form-data') {
      const p = new FormData()
      for (const key in data) {
        p.append(key, data[key])
      }
      return instance.post(url, p, { headers })
    }
    // 默认 application/json
    return instance.post(url, data)
  case 'PUT': // 全部更新
    return instance.put(url, data)
  case 'PATCH': // 局部更新
    return instance.patch(url, data)
  case 'DELETE': // 删除
    return instance.delete(url, { data })
  default:
    return instance(config)
  }
}


export default request
