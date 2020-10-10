import React from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button} from 'antd';
import styled from 'styled-components'
import { useStore } from '../stores'
import { useHistory } from 'react-router-dom'

const LoginBox = styled.div`
    width:400px;
    margin:50px auto;
    box-shadow:2px 2px 4px 0 rgba(0,0,0,0.3);
    border-radius:4px;
    padding:20px;
`
const Title = styled.h1`
    text-align:center;
    margin-bottom: 30px;
`
const StyleButton = styled(Button)`
    margin-left:10px;
    background:#006d75;
    border:#006d75;
    &:hover,&:focus{
        background:#006d75;
        border:#006d75;
    }
`
const Component = observer(() => {
    const { AuthStore } = useStore()
    const history = useHistory()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 16 },
    };
    const onFinish = values => {
        console.log('Success:', values);
        AuthStore.setUsername(values.username)
        AuthStore.setPassword(values.password)
        AuthStore.Login().then(()=>{
            console.log('登录成功，跳转到首页')
            history.push('/')
        }).catch(()=>console.log('登录失败'))
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule,value)=>{
        console.log(value)
        if(value===undefined){
            return Promise.resolve();
        }else{
            if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
            if(value.length<4 || value.length>10) return Promise.reject('长度为4~10个字符');
            return Promise.resolve();
        }
        
    }
    return (
        <LoginBox>
            <Title>登录</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名!' },
                        { validator:validateUsername}
                
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码!' },
                        { min:4,message:'最少4个字符'},
                        { max:10,message:'最大10个字符'}
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <StyleButton type="primary" htmlType="submit">
                        登录
                </StyleButton>
                </Form.Item>
            </Form>
        </LoginBox>
    )
})

export default Component