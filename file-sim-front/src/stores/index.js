import {Get, PostJson} from '../fetchHandler';
import {observable, action, computed, extendObservable, get} from 'mobx';
import omit from 'lodash/omit';
import {message} from 'td-ui';

/**
 * 全局store
 * 通常放登陆信息等全局信息，以及ui控制相关的属性，例如loading状态
 */
export class GlobalStore {
    static instance = null;

    @observable loading = false; // 加载状态，加observable修饰表示此属性值的变化会引起页面的更新
    @observable username;
    @observable usertype;
    @observable realName;
    @observable currLocation = 'homepage';


    @action
    getCurrLocation() {
        this.currLocation = window.location.hash.split('/')[1];
    }

    @action
    async testAPI() {
        const url = '/test';
        try {
            const res = await Get(url);
            console.log('res.message: ', res.data);
            message.info('server connected ok!');
            return res.data;
        }
        catch (e) {
            console.log('error occured!');
            return false;
        }
    }

    @action
    async logIn(userInput) {
        const url = '/login';
        this.loading = true;

        try {
            const res = await PostJson(url,userInput);
            if(res.result){
                message.info(res.data);
                localStorage.setItem('username',userInput.username);
                localStorage.setItem('usertype',userInput.usertype);
                this.username = userInput.username;
                this.usertype = userInput.usertype;
                setTimeout(()=>{
                    window.location.href='#/homepage';
                },2000);
            }
            else {
                message.info(res.data);
            }
            this.loading = false;
            return res.result;
        }
        catch (e) {
            return false;
        }
    }
    @action
    async logOut() {
        const url = '/logout';
        this.loading = true;

        try {
            const res = await Get(url);
            if(res.result){
                message.info(res.data);
                localStorage.removeItem('username');
                localStorage.removeItem('usertype');
                localStorage.removeItem('recordId');
                setTimeout(()=>{
                    window.location.href='#/homepage';
                },2000);
            }
            else {
                message.info(res.data);
            }
            this.loading = false;
        }
        catch (e) {
            return false;
        }
    }
    @action
    async createAccount(userInput) {
        const url = '/createAccount';
        try {
            const res = await PostJson(url, userInput);
            console.log(res.result);
            message.info('注册成功！2秒后刷新页面...');

            if (res.result)
                setTimeout(()=>{
                    window.location.reload();
                },2000);

        }catch (e){
            return false;
        }
    }


    static getInstance() { // 单例模式
        if (!GlobalStore.instance) {
            GlobalStore.instance = new GlobalStore();
        }
        return GlobalStore.instance;
    }

    @action
    setLoading(loading) {
        this.loading = loading;
    }

    @action
    setUserName(userName) {
        this.userName = userName;
    }

    @action
    setRealName(realName) {
        this.realName = realName;
    }
}

const globalStore = GlobalStore.getInstance();

const stores = {
    globalStore
};
// 自动装载以Store结尾的文件或文件夹，如果是文件夹，目录下必须有一个index.js导出模块
// 装载的模块必须包含namespace，最终会挂仔载到globalStore中
const req = require.context('.', true, /Store$/);
req.keys().map(key => {
    const Store = req(key).default;
    stores[Store.namespace] = new Store(globalStore);
});
extendObservable(globalStore, omit(stores, 'globalStore'));

export default stores;
