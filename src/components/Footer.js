import React from 'react';
import styled from 'styled-components'

const Footer = styled.footer`
    background-color:#f5f5f5;
    color:#595959;
    text-align:center;
    font-size:12px;
    padding:10px;
`

function Component(){
    return (
        <Footer>请勿上传违反中国大陆和香港法律的图片，违者后果自负。</Footer>
    )
}

export default Component;