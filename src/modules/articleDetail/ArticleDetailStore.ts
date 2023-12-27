import { observable } from "mobx";
import { request } from "../../utils/request"
import Loading from "../../components/widget/Loading";

export default class ArticleDetailStore {

    @observable detail: Article = {} as Article;

    requestArticleDetail = async (id: number) => {
        Loading.show();
        const params = {
            id
        }
        request('articleDetail', params).then((res: any) => {
            this.detail = res.data;
            Loading.hide();
        })
    }

}
