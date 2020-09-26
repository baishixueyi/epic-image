import AV,{User} from 'leancloud-storage';

AV.init({
    appId: "f1rxvy1F1sLsQBOwzq98gMfI-gzGzoHsz",
    appKey: "541IAS9xvWN6K7g7SlljmcJ8",
    serverURL: "https://uqbaasqm.lc-cn-n1-shared.com"
  });

const servelApi = {
    register(username,password){
        console.log(username+'---'+password)
        let user = new User()
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve,reject)=>{
            user.signUp().then(loginUser=>resolve(loginUser),error=>reject(error))
        })
    },
    login(username,password){
        return new Promise((resolve,reject)=>{
            User.logIn(username,password).then(loginUser=>resolve(loginUser),error=>reject(error))
        })
    },
    logout(){
        User.logOut()
    },
    getCurrentUser(){
        console.log(User.current())
        return User.current()
    }
}

const Uploader = {
    add(file,filename){
        const item = new AV.Object('Image')
        const avFile = new AV.File(filename,file)
        item.set('filename',filename)
        item.set('owner',User.current())
        item.set('url',avFile)
        return new Promise((resolve,reject)=>{
            item.save().then(fileInfo=>resolve(fileInfo),error=>reject(error))
        })
    }
}

export {servelApi,Uploader}
