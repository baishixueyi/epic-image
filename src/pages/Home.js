import React from 'react';
import { observer } from 'mobx-react'
import { useStore } from '../stores'

const Home = observer(()=>{
    const { userStore }  = useStore()
    return (
        <>
        {
            userStore.currentUser?<>Hello {userStore.currentUser.attributes.username}</>:<>用戶未登录</>
        }
        </>
    )
})

export default Home;