import { action, observable } from 'mobx'
import { Uploader } from '../models'

class ImageStore {
    @observable filename = "" 
    @observable file = null
    @observable isUploading = false
    @observable serverFile = null
    
    @action setFilename(newFilename){
        this.filename = newFilename
    }
    @action setFile(newFile){
        this.file = newFile
    }
    @action upload(){
        this.isUploading = true
        return new Promise((resolve,reject)=>{
            Uploader.add(this.file,this.filename).then(fileInfo=>{
               resolve(fileInfo) 
               this.serverFile = fileInfo
            }).catch(err=>{
                console.log('上传失败')
                reject(err)
            }).finally(()=>{
                this.isUploading = false
            })
        })
    }
    @action reset(){
        this.filename=""
        this.file = null
        this.serverFile = null
    }
}

export default new ImageStore()