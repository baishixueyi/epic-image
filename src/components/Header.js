import React, { useEffect } from 'react';
import Logo from './logo.svg'
import { NavLink,useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import { observer} from 'mobx-react'
import { useStore } from '../stores'

const Header = styled.header`
display:flex;
align-items:center;
padding:10px 100px;
background-color:#141414;
`
const Logostyle = styled.img`
height:30px;
`
const StyleLink = styled(NavLink)`
    margin-left:30px;
    color:#595959;
    &.active{
        color:#fff;
        border-bottom:1px solid #fff;
    }
    &:hover{
        color:#fff;
    }
`
const Login = styled.div`
    margin-left:auto;
    color:#fff;
`
const StyleButton = styled(Button)`
    margin-left:10px;
    background:#006d75;
    border:#006d75;
`
const Component = observer(()=> {
    const { AuthStore,userStore }  = useStore()
    const history = useHistory()
    const handleLogin = ()=>{
        history.push('/login')
    }
    const handleRegister = ()=>{
        history.push('/register')
    }
    const handleLogout = ()=>{
        console.log('注销')
        AuthStore.Logout()
    }
    useEffect(()=>{
        userStore.pullUser()
    },[])
    return (
        <Header>
            <Logostyle src={Logo} />
            <nav>
                <StyleLink to="/" activeClassName="active" exact>首页</StyleLink>
                <StyleLink to="/history" activeClassName="active">上传历史</StyleLink>
                <StyleLink to="/about" activeClassName="active">关于我</StyleLink>
            </nav>
            <Login>
                {
                    userStore.currentUser?<>{userStore.currentUser.attributes.username}<StyleButton type="primary" onClick={handleLogout}>注销</StyleButton> </>:<><StyleButton type="primary" onClick={handleLogin}>登录</StyleButton>
                    <StyleButton type="primary" onClick={handleRegister}>注册</StyleButton></>
                }
                
            </Login>

        </Header>
    )
})

export default Component;