import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button} from 'antd';
import { useStore } from '../stores'


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
const Component = observer(() => {
    const { AuthStore } = useStore()
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
        AuthStore.register().then(res=>{
            console.log('注册成功')
        }).catch(error=>console.log('注册失败'))
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule,value)=>{
        if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
        if(value.length<4 || value.length>10) return Promise.reject('长度为4~10个字符');
        return Promise.resolve();
    }
    const validateConfirm = ({getFieldValue})=>({
        validator(rule,value){
            if(getFieldValue('password')===value) return Promise.resolve();
            return Promise.reject('两次密码不一致')
        }
    })
    return (
        <LoginBox>
            <Title>注册</Title>
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

                <Form.Item
                    label="确认密码"
                    name="comfirm-password"
                    rules={[
                        { required: true, message: '再次确认密码!' },
                        validateConfirm
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                </Button>
                </Form.Item>
            </Form>
        </LoginBox>
    )
})

export default Component