import { observable, action } from 'mobx';
import serverLogin from '../models'
import userStore from './user'

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
            serverLogin.login(this.values.username,this.values.password)
            .then(res=>userStore.pullUser())
            .catch(error=>console.log(error))
        })
    }
    
    @action register(){
        console.log('注册中。。。')
        this.isLoading = true
        return new Promise((resolve,reject)=>{
            serverLogin.register(this.values.username,this.values.password).then(res=>console.log('注册成功'+res)).catch(error=>console.log('注册失败'+error))
        })
        
    }

    @action Logout(){
        this.isLogin = false
        console.log('已注销')
        serverLogin.logout()
        userStore.resetUser()
    }
}

export default new  AuthStore()