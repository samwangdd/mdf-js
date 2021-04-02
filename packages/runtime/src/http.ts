// import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// /**
//  * @file 封装 axios，为工程模块提供网络基础库支持
//  */

// export type InterceptorPlugin = {
//   type: string;
//   fn: Function;
// };

// export type RequestOpts = AxiosRequestConfig & {
//   onBefore?: Function;
//   onAfter?: Function;
// };

// export { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// /**
//  * 全局参数注入
//  */
// function useDefaults(fn: Function) {
//   fn && fn.call(null, axios.defaults);
// }

// /**
//  * 注册全局的拦截器
//  */
// const interceptors: Array<InterceptorPlugin> = [];
// function registerInterceptor(type: string, fn: Function) {
//   interceptors.push({ type, fn: toPromise(fn) });
// }

// /**
//  * 创建 axios instance，不提供全局方法的调用
//  */
// function create(opts: RequestOpts): AxiosInstance {
//   const instance = axios.create(opts);

//   // 请求前
//   instance.interceptors.request.use((config) => {
//     const actuator = genActuator(interceptors, 'before');

//     return actuator(config).then((config) => {
//       if (opts.onBefore) {
//         opts.onBefore(config);
//       }

//       return config;
//     });
//   });

//   // 请求结束
//   instance.interceptors.response.use((res) => {
//     const actuator = genActuator(interceptors, 'after');

//     return actuator(res).then((res) => {
//       if (opts.onAfter) {
//         opts.onAfter(res);
//       }

//       return res;
//     });
//   });

//   // 屏蔽 axios 自身属性
//   return new Proxy(instance, {
//     get(target, prop: string) {
//       switch (prop) {
//         case 'request':
//           return target[prop];
//         case 'get':
//           return target[prop];
//         case 'delete':
//           return target[prop];
//         case 'head':
//           return target[prop];
//         case 'options':
//           return target[prop];
//         case 'put':
//           return target[prop];
//         case 'post':
//           return target[prop];
//         case 'all':
//           return target[prop];
//         case 'spread':
//           return target[prop];
//         case 'interceptors':
//           return interceptors;
//         default:
//           return undefined;
//       }
//     },
//   });
// }

// function genActuator(list: Array<InterceptorPlugin>, type: string) {
//   list = list.filter((plugin) => plugin.type === type);

//   return function (data: any) {
//     const reqs = list.map((plugin) => plugin.fn(data));
//     return Promise.allSettled(reqs).then(() => data);
//   };
// }

// function toPromise(fn: Function) {
//   return function (...args: any) {
//     const ret = fn.apply(null, args);
//     return ret instanceof Promise ? ret : Promise.resolve(ret);
//   };
// }

// export const http = {
//   useDefaults,
//   registerInterceptor,
//   create,
// };

export const http = {
  create: function(opts: any) {},
  registerInterceptor: function() {},
};
