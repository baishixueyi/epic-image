import React from 'react'
import { useStore } from '../stores'
import { observer }  from 'mobx-react'
import styled from 'styled-components'

// 组件使用方法 <Tips>请先登录后上传图片</Tips> {children} 指的是文字内容
const Tips = styled.div`
    margin:20px 0;
    padding:5px;
    background:orange;
    color:#fff;
`
const Components = observer(({ children })=>{
    const { userStore } = useStore()
    return (
        userStore.currentUser?null:<Tips>{ children }</Tips>
    )
})

export default Components