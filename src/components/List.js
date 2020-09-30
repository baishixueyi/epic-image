import React, { useEffect } from 'react'
import { useStore } from '../stores'
import { observer } from 'mobx-react'
import { List, Button, Skeleton } from 'antd';
import styled from 'styled-components'

const Img = styled.img`
    width:100px
`


const Components = observer(() => {
    const { historyStore } = useStore()
    const onLoadMore = () => {
        historyStore.find()
    };
    const loadMore =
        !historyStore.isLoading && historyStore.hasMore ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;
    useEffect(()=>{
            historyStore.find()
        return ()=>{
            historyStore.reset()
        }
    },[])
    return (
        <List
            className="demo-loadmore-list"
            loading={historyStore.isLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={historyStore.list}
            renderItem={item => (
                <List.Item key={item.id}>
                    <Skeleton avatar title={false} loading={historyStore.isLoading} active>
                        <div>
                            <Img src={item.attributes.url.attributes.url} />
                        </div>
                        <div>
                            <h5>{item.attributes.filename}</h5>
                        </div>
                        <div>
                            <a target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                        </div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );

})

export default Components