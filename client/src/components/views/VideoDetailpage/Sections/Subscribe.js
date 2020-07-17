import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    console.log(props);
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setsubcribed] = useState(false)

    useEffect(() => {

        let subscribeNumberValue = { userTo: props.userTo }

        //구독자 정보(몇명인지) 상태값 가져오기
        Axios.post('/api/subscribe/subscribeNumber', subscribeNumberValue)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Subscriber Info load Failed')
                }
            })

        //내가 이 비디오 업로드한 사람을 구독하는지?
        let subscribedValue = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

        Axios.post('/api/subscribe/subscribed', subscribedValue)
            .then(response => {
                if (response.data.success) {
                    setsubcribed(response.data.Subscribed)
                } else {
                    alert('Subscribed Info load Failed');
                }
            })
    }, [])

    const onSubscribe = () => {

        let subscribeValue = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        //이미 구독중이라면?
        if (Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeValue)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setsubcribed(!Subscribed)
                    } else {
                        alert('구독취소에 실패')
                    }
                })
        } else {//아직 노구독
            Axios.post('/api/subscribe/doSubscribe', subscribeValue)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setsubcribed(!Subscribed)
                    } else {
                        alert('구독하는데 실패')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribed ? '#CC0000' : '#AAAAAA'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribe' : 'Subscribed'}
            </button>
        </div>
    )
}

export default Subscribe
