import React from 'react';
import Logo from './logo.svg'
import { NavLink,useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'

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
    color:#fff;
    &.active{
        border-bottom:1px solid #fff;
    }
`
const Login = styled.div`
    margin-left:auto;
`
const StyleButton = styled(Button)`
    margin-left:10px;
`
function Component() {
    const history = useHistory()
    const handleLogin = ()=>{
        history.push('/login')
    }
    const handleRegister = ()=>{
        history.push('/register')
    }
    return (
        <Header>
            <Logostyle src={Logo} />
            <nav>
                <StyleLink to="/" activeClassName="active" exact>首页</StyleLink>
                <StyleLink to="/history" activeClassName="active">上传历史</StyleLink>
                <StyleLink to="/about" activeClassName="active">关于我</StyleLink>
            </nav>
            <Login>
                <StyleButton type="primary" onClick={handleLogin}>登录</StyleButton>
                <StyleButton type="primary" onClick={handleRegister}>注册</StyleButton>
            </Login>

        </Header>
    )
}

export default Component;