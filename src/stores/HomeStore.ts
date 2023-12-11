/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-12-09 21:41:20
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-10 22:38:31
 */
import { action, observable } from 'mobx';
import {request} from '../utils/request';

const SIZE = 10;
export default class HomeStore {
  page: number = 1;

  @observable homeList: any[] = [];

  @observable refreshing: boolean = false;

  @action
  resetPage = () => {
      this.page = 1;
  }

  requestHomeList = async () => {
    if (this.refreshing) {
        return;
    }
    try {
      this.refreshing = true;
      const params = {
        page: this.page,
        size: SIZE,
      };
      const {data} = await request('homeList', params);
      if (data?.length) {
        if (this.page === 1) {
            this.homeList = data;
        } else {
            this.homeList = [...this.homeList, ...data];
        }
        this.page = this.page + 1;
    } else {
        if (this.page === 1) {
            this.homeList = [];
        } else {
         
            // 已经加载完了，没有更多数据
        }
    }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
      // Loading.hide();
    }
  };
}
