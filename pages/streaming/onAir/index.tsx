import { useEffect, useState } from "react"
import Layout from "../../../components/Layout/Layout"
import styles from "../../../styles/onAir.module.scss"

// import Link from "next/link"

const onAir = () => {

    let [infoFormVisible, setInfoFormVisible] = useState(true)
    let [chatVisible, setChatVisible] = useState(true)

    useEffect(
        function startup() {
            let video = document.getElementById("video") as HTMLVideoElement

            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(stream => {
                    console.log(stream)

                    video.srcObject = stream;
                    video.style.objectFit = "contain"
                    video.style.height = "100%"
                    // video.style.width = "100%"
                    video.play();
                })
                .catch(err => console.log("An error occurred: " + err))
        }
    )


    return (
        <Layout title={"The Live | 방송 시작하기"}>
            <div className={styles.container}>
                <main className={styles.mainContent}>
                    <aside className={`${styles.streamInfoFormDiv} ${infoFormVisible ? styles.active : styles.hide}`}>
                        <form className={styles.infoForm} onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="streamTitle">방송제목</label>
                            <textarea id="streamTitle" />

                            <label htmlFor="streamDescription">방송설명</label>
                            <textarea id="streamDescription" />

                            <label htmlFor="streamItme">상품선택 </label>
                            <textarea id="streamItme" />

                            <button type="submit">확인</button>
                            <button type="button">초기화하기</button>
                        </form>
                    </aside>
                    <section className={styles.videoArea}>
                        <div className={styles.myVideoDiv}>
                            <video id="video" className={styles.preview} />
                        </div>
                        <div className={styles.buttonLine}>
                            <button type="button" onClick={() => setInfoFormVisible(!infoFormVisible)}>방송정보 열기</button>
                            <button type="button" onClick={() => setChatVisible(!chatVisible)}>채팅 열기</button>
                            <button type="button" onClick={() => setChatVisible(!chatVisible)}>방송 시작하기</button>
                            <button type="button" onClick={() => setChatVisible(!chatVisible)}>방송 종료하기</button>
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