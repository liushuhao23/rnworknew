/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-18 21:33:43
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-25 17:37:20
 */
const apiConfig = {
  login: {
    url: "/user/login",
    method: "get",
  },
  homeList: {
    url: "/home/homeList",
    method: "get",
  },
  articleDetail: {
    url: "/article/articleDetail",
    method: "get",
  },
  goodsList: {
    url: "/goods/goodsList",
    method: "get",
  },
  top10Category: {
    url: "/goods/top10Category",
    method: "get",
  },
  messageList: {
    url: "/message/messageList",
    method: "get",
  },
  unread: {
    url: "/message/unread",
    method: "get",
  },
  accountInfo: {
    url: "/mine/accountInfo",
    method: "get",
  },
  noteList: {
    url: "/mine/noteList",
    method: "get",
  },
  collectionList: {
    url: "/mine/collectionList",
    method: "get",
  },
  favorateList: {
    url: "/mine/favorateList",
    method: "get",
  },
};

export default apiConfig;
