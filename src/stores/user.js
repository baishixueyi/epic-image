import { observable,action } from 'mobx'
import serverLogin from '../models'

class UserStore {
    @observable currentUser = null;

    @action pullUser(){
        this.currentUser = serverLogin.getCurrentUser()
    }

    @action resetUser(){
        this.currentUser = null
    }
}

export default new UserStore()