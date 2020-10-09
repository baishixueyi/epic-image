import React from 'react';
import styled from 'styled-components'

const Section = styled.section`
    border:1px dotted ;
    background:rgb(255,204,204);
    padding:5px;
`

function About(){
    return (
        <>
            <h1>关于epic-image图床工具</h1>
            <Section>
                <h2>这是一款可以在线上上传图片的图床网站。</h2>
                使用步骤：
                <ol>
                    <li>注册用户，</li>
                    <li>进行登录，只有登录用户才有权限上传图片，</li>
                    <li>点击/拖拽上传图片,上传图片区域下方显示已经上传图片的结果，用户可以直接使用图片链接，也可以定制图片尺寸，</li>
                    <li>导航栏上传历史为当前登录用户上传所有图片和链接。</li>
                </ol>

            </Section>
        </>
    )
}

export default About;