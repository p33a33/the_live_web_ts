import { useEffect, useState } from "react"
import { actions, listening } from "../../../utils/clientSocketManager"
import styles from "../../../styles/onAir.module.scss"
import { socket } from "../../../utils/context"
import { createPeerConnection } from "../../../utils/rtc"

const onAir = () => {

    let [configFormVisible, setConfigFormVisible] = useState(true)
    let [chatVisible, setChatVisible] = useState(true)
    let [onAir, setOnAir] = useState(false)
    let [title, setTitle] = useState("")
    let [newTitle, setNewTitle] = useState("")
    let [description, setDescription] = useState("")
    let [newDescription, setNewDescription] = useState("")

    useEffect(
        () => {
            let video = document.getElementById("video") as HTMLVideoElement
            let localStream: MediaStream;
            let pc: RTCPeerConnection = createPeerConnection()

            /* socket.io 설정 */
            listening.joined()
            listening.left()
            actions.joinRoom("streamTest");

            /* 스트리머 미디어 받아 Peer에 추가, Preview 렌더 */
            (async () => {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                console.log([...localStream.getTracks()])
                pc.addTrack([...localStream.getTracks()][0])
                console.log(pc)
                let offer = await pc.createOffer()
                pc.setLocalDescription(offer) // => oniceCandidate trigger
                socket.on("viewerIn", () => {
                    console.log("recognize viewer")
                    actions.sendOffer(offer)
                })
                socket.on("answer", (answer: RTCSessionDescriptionInit) => {
                    pc.setRemoteDescription(answer)
                })
                video.srcObject = localStream
                video.play();
            })()

            /* 컴포넌트 종료시 */
            return () => {
                video.pause();
                localStream.getTracks()[0].stop();
                actions.leaveRoom("streamTest")
            }
        }, []
    )

    let startStreaming = () => {
        if (!title || !description) {
            alert("방송 제목과 설명을 먼저 입력해주세요")
        } else {
            setOnAir(true)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <main className={styles.mainContent}>
                    <aside className={`${styles.streamConfigFormDiv} ${configFormVisible ? styles.active : styles.hide}`}>
                        <form className={styles.configForm} onSubmit={(e) => { e.preventDefault(); setTitle(newTitle); setDescription(newDescription) }}>
                            <label htmlFor={styles.streamTitle}>방송 제목</label>
                            <textarea id={styles.streamTitle} placeholder="방송 제목을 입력해주세요" onChange={e => setNewTitle(e.target.value)} />

                            <label htmlFor={styles.streamDescription}>방송 설명</label>
                            <textarea id={styles.streamDescription} placeholder="방송 설명을 입력해주세요" onChange={e => setNewDescription(e.target.value)} />

                            <label htmlFor="streamItme">상품 선택 </label>
                            <select id="streamItme" defaultChecked />

                            <button type="submit">확인</button>
                            {onAir ? <button type="submit">수정사항 적용하기</button> : <button type="submit" disabled >수정사항 적용하기</button>}
                            <button type="button">초기화하기</button>
                            <hr />
                            <label>방송 송출 정보</label>
                            <div>시청자 수 : {Number(Math.random().toFixed(3)) * 1000}명</div>
                            <div>현재 상품 판매량 : {Number(Math.random().toFixed(1)) * 100}개</div>
                        </form>
                    </aside>
                    <section className={styles.videoArea}>
                        <div className={styles.videoPannel}>
                            <video id="video" className={styles.preview} style={{ objectFit: "cover", width: `100%`, height: `70vh` }} />
                        </div>
                        <div className={styles.boradcastDescription}>
                            <h1>{title || "방송 제목이 표시됩니다"}</h1>
                            <div>{description || "방송 설명이 표시됩니다"}</div>
                        </div>
                        <hr />
                        <div className={styles.buttonLine}>
                            <button type="button" onClick={() => setConfigFormVisible(!configFormVisible)}>방송설정 열기</button>
                            <button type="button" onClick={() => setChatVisible(!chatVisible)}>채팅 열기</button>
                            <button type="button" onClick={() => setOnAir(false)} disabled={onAir ? true : false}>방송 종료하기</button>
                            <button type="button" onClick={startStreaming} disabled={onAir ? false : true}>방송 시작하기</button>
                        </div>
                    </section>
                    <aside className={`${styles.chatArea} ${chatVisible ? styles.active : styles.hide}`}>
                        <div className={`${styles.chatRender} ${chatVisible ? styles.active : styles.hide}`}>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    )
}

export default onAir;