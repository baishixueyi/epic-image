import { observable,action } from 'mobx'
import {servelApi} from '../models'

class UserStore {
    @observable currentUser = null;

    @action pullUser(){
        this.currentUser = servelApi.getCurrentUser()
    }

    @action resetUser(){
        this.currentUser = null
    }
}

export default new UserStore()