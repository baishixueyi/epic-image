import { observable,action } from 'mobx'
import { Uploader } from '../models'
import { message } from 'antd'

class HistoryStory {
    @observable list =[]
    @observable isLoading = false
    @observable hasMore = true
    @observable page = 1;
    pagesize = 1

    @action append(newList){
        this.list = this.list.concat(newList)
    }

    @action find() {
        this.isLoading = true
        Uploader.select(this.page,this.pagesize).then(list=>{
            this.append(list)
            this.page++
            if(list.length < this.pagesize){
                this.hasMore = false
            }
        }).catch(error =>{
            message.error('加载失败')
        }).finally(()=>{
            this.isLoading = false
        })
    }

    @action reset(){
        this.list = []
        this.isLoading = false
        this.hasMore = true
        this.page = 1
    }
}

export default new HistoryStory()