/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-18 21:01:54
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-24 16:58:40
 */
import axios, {AxiosResponse} from 'axios';
import Apis from '../api/Apis';

// const baseURL = 'http://192.168.0.106:7001'; // window
// const baseURL = 'http://10.80.12.15:7001';// mac 
const baseURL = 'http://192.168.0.101:7001';// mac 

// 192.168.0.103
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000,
});

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  response => response,
  error => {
    console.log('输出error', error);
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
        // 服务端报错
      } else if (status === 400) {
        // 接口参数异常
      } else if (status === 401) {
        // 登陆信息过期，需要重新登陆
      } else {
        // 其它错误类型，统一按照接口报错处理
      }
    } else {
      // 网络异常
    }
    return Promise.reject(error);
  },
);

export const request = (
  name: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (Apis as any)[name];
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

export const get = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {
    params: params,
  });
};

export const post = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};
