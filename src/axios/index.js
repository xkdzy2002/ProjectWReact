import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, { param: 'callback' }, function(err, response) {
        // if (response.status === 'success') {
        //   resolve(response);
        // } else {
        //   reject(response.messsage);
        // }
        if (!response.err) {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      });
    });
  }

  static ajax(options) {
    let loading;

    // let baseApi = 'https://www.easy-mock.com/mock/5bc303ecb0bf35423bd75308/mockapi';
    let baseApi = 'http://10.52.200.46:9002/api';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || '',
      }).then(response => {

        if(response.status == '200'){
            console.log(response.data);
            let res = response.data;
            Modal.info({
              title: '获取数据提示',
              content: response.error == null?'数据正常返回': response.error
            });

            resolve(res);
        }else{
            reject(response.data);
        }

      });
    });
  }
}
