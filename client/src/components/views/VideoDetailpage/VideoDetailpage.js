//This is client Templet
import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';

function VideoDetailpage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideo', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert("VideoInfo load Failed");
                }
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                        <List.Item actions>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                //image 정보를 가져오기 전에 image 정보를 가져와서 에러가 남. 이미지 정보가 있으면 렌더링 하도록 해야함.
                                title={VideoDetail.writer.name}
                                description={VideoDetail.writer.description} />
                        </List.Item>

                        {/* Comments*/}

                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    Side Videos
                </Col>
            </Row>
        )
    } else {
        return (
            <div>...Loading</div>
        )
    }

}

export default VideoDetailpage
