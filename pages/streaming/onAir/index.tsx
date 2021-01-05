import { useEffect, useState } from "react"
import Layout from "../../../components/Layout/Layout"
import styles from "../../../styles/onAir.module.scss"

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
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(stream => {
                    localStream = stream
                    video.srcObject = stream;
                    video.style.objectFit = "cover"
                    video.style.width = "100%"
                    video.style.height = "70vh"
                    video.play();
                })
                .catch(err => console.log("An error occurred: " + err))

            return () => {
                video.pause();
                localStream.getTracks()[0].stop();
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
        <Layout title={"The Live | 방송 시작하기"}>
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
                            <video id="video" className={styles.preview} />
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
        </Layout >
    )
}

export default onAir;