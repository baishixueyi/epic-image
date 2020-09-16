import React from 'react';
 import Logo from './logo.svg'
import {Link,NavLink} from 'react-router-dom'
import styled from 'styled-components'

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
function Component(){
    return (
        <Header>
            <Logostyle src={Logo} />
            <nav>
                <StyleLink to="/" activeClassName="active" exact>首页</StyleLink>
                <StyleLink to="/history" activeClassName="active">上传历史</StyleLink>
                <StyleLink to="/about" activeClassName="active">关于我</StyleLink>
            </nav>
            <button><Link to="/login">登录</Link></button>
            <button><Link to="/register">注册</Link></button>
        </Header>
    )
}

export default Component;