import React, { useState, useEffect } from 'react';
import axios from 'axios';


//전체적인 카드하나, 정보들
function SideVideo() {

    const [sideVideos, setsideVideos] = useState([])

    useEffect(() => {//이것은 Dom이 로드되자마자 무엇을 한번 할껀지
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setsideVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const renderSideVideo = sideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <a href={`/video/${video._id}`} >
            <div key={index} style={{ display: 'flex', marginBottom: "1rem", padding: '0 2rem' }} >
                <div style={{ width: '40%', marginRight: '1rem' }}>
                    <a href>
                        <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt />
                    </a>
                </div>

                <div style={{ width: '50%' }}>
                    <a href style={{ color: 'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <span >{video.writer.name}</span><br />
                        <span >{video.views} view</span><br />
                        <span >{minutes} : {seconds}</span>
                    </a>
                </div>
            </div >
        </a>
    })

    return (
        <React.Fragment>
            <div style={{ marginTop: '3rem' }} />
            {renderSideVideo}

        </React.Fragment>


    )
}

export default SideVideo
