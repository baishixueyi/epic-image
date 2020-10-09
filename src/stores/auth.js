import { observable, action } from 'mobx';
import {servelApi} from '../models'
import userStore from './user'
import imageStore from './image'
import historyStore from './history'

class AuthStore{
    @observable isLoading = false;
    @observable values = {
        username:'',
        password:''
    }
    @action setUsername(username){
        this.values.username = username
    }

    @action setPassword(password){
        this.values.password = password
    }

    @action Login(){
        console.log('登录中。。。')
        this.isLoading = true
        return new Promise((resolve,reject)=>{
            servelApi.login(this.values.username,this.values.password)
            .then(res=>{
              userStore.pullUser() 
              resolve(res) 
            }).catch(error=>{
                reject(error)
            })
        })
    }
    
    @action register(){
        console.log('注册中。。。')
        this.isLoading = true
        return new Promise((resolve,reject)=>{
            servelApi.register(this.values.username,this.values.password).then(res=>resolve(res)).catch(error=>reject(error))
        })
        
    }

    @action Logout(){
        this.isLogin = false
        console.log('已注销')
        servelApi.logout()
        userStore.resetUser()
        imageStore.reset()//首页退出清空上传图片信息
        historyStore.reset() //历史记录进行清空
    }
}

export default new  AuthStore()