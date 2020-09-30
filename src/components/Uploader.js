import React, { useRef } from 'react'
import { useStore } from '../stores'
import { observer,useLocalStore } from 'mobx-react'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const { Dragger } = Upload;

const Result = styled.div`
    margin-top:30px;
    border:1px dashed #ccc;
    padding:20px;
`
const H1 = styled.h1`
    margin:20px 0;
    text-align:center;
`
const Image = styled.img`
    max-width:300px;
`

const Components=observer(()=>{
    const { imageStore,userStore } = useStore()
    const ref1 = useRef()
    const ref2 = useRef()
    const store = useLocalStore(()=>({
        width:null,
        setWidth(width){
            store.width = width
        },
        get widthStr(){
            return store.width?`/w/${store.width}`:''
        },
        height:null,
        setHeight(height){
            store.height = height
        },
        get heightStr(){
            return store.height?`/h/${store.height}`:''
        },
        get fullStr(){
            return imageStore.serverFile.attributes.url.attributes.url + '?imageView2/0'+store.widthStr+store.heightStr
        }
    }))
    const handleWidth = ()=>{
        store.setWidth(ref1.current.value)
    }
    const handleHeight = ()=>{
        store.setHeight(ref2.current.value)
    }
    const props = {
        multiple: true,
        showUploadList:false,
        beforeUpload:file=>{
            if(userStore.currentUser===null){
                message.warning('请先登录后上传')
                return false
            }
            console.log(file)
            //限制上传图片格式和大小
            if(!/(png$)|(gif$)|(svg$)|(jpg$)|(jpeg$)/ig.test(file.type)){
                message.error('只能上传png/gif/svg/jpg/jpeg格式的图片')
                return false
            }
            if(file.size>2*1024*1024){
                message.error('图片最大上传2M')
                return false
            }
            imageStore.setFilename(file.name)
            imageStore.setFile(file)
            imageStore.upload()
            .then((serveFile)=>{
                console.log('上传成功')
                console.log(serveFile)
            }).catch(()=>{
                console.log('上传失败')
            })
            return false
        },
    };
    return (
        <div style={{marginTop:'30px'}}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽上传图片</p>
                <p className="ant-upload-hint">
                   仅支持png/gif/svg/jpg/jpeg格式的图片，最大为2M
                </p>
            </Dragger>
                {imageStore.serverFile?<Result>
                    <H1>上传结果</H1>
                    <dl>
                        <dt>线上地址</dt>
                        <dd><a target="_blank" href={imageStore.serverFile.attributes.url.attributes.url}>{imageStore.serverFile.attributes.url.attributes.url}</a></dd>
                        <dt>文件名</dt>
                        <dd>{imageStore.filename}</dd>
                        <dt>图片预览</dt>
                        <dd><Image src={imageStore.serverFile.attributes.url.attributes.url}/></dd>
                        <dt>更多尺寸</dt>
                        <dd>
                            <input ref={ref1} onChange={handleWidth} placeholder="最大宽度（可选）"/>
                            <input ref={ref2} onChange={handleHeight} placeholder="最大高度（可选）"/>
                        </dd>
                        <dd><a target="_blank" href={store.fullStr}>{store.fullStr}</a></dd>
                    </dl>
                </Result> : null}
        </div>
    )
})

export default Components