import React from 'react';
import { observer } from 'mobx-react'
import { useStore } from '../stores'
import Uploader from '../components/Uploader'
import { Alert } from 'antd';

const Home = observer(()=>{
    const { userStore }  = useStore()
    return (
        <>
        {
            userStore.currentUser?<></>:<Alert message="请先登录后上传图片" type="warning" />
        }
        <Uploader/>
        </>
    )
})

export default Home;