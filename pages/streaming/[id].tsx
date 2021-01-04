import { KeyboardEvent, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout"
import { slideData } from "../../interfaces/globalTypes";
import getDatas from "../../utils/getDatas";
import styles from '../../styles/streamingView.module.scss'

const StreamingView = ({ pageData }: { pageData: slideData }) => {

    const [isChattingOn, setIsChattingOn] = useState(false)
    const [chats, setChats] = useState<Array<{ id: string, chat: string }>>([])

    const sendChat = () => {
        let inputValue = document.getElementById("chatInput") as HTMLInputElement
        if (inputValue) {
            let temp = chats
            temp.push({ id: "tester", chat: inputValue.value })
            setChats([...temp]);
            inputValue.value = ""
        } else {
            alert("메시지를 입력해주세요")
        }
    }

    const pressEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            sendChat();
        }
    }

    return (
        <Layout title={`The Live | ${pageData.title}`}>
            <div className={styles.pageContainer}>
                {/*video player, chat */}
                <main className={styles.streamArea}>
                    <section className={styles.streamPlayerSection}>
                        <div>
                            <video className={styles.videoPlayer}
                                controls
                                width="100%"
                                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                                autoPlay={false}
                                playsInline
                            />

                            {/* buttons, viewerCounter, streaming description*/}
                        </div>
                        <div>
                            {/* streaming title, viewerCount */}
                            <h1 className={styles.streamTitle}>
                                {pageData.title} <small>📺️{pageData.viewerCount}명 시청중</small>
                            </h1>

                            {/* buttons*/}
                            <div className={styles.buttons}>
                                <div className={styles.itemOption}>
                                    <button type="button">🛒️카트에 담기</button>
                                    <button type="button">🎁️지금 구매하기</button>
                                    <button type="button">🖤️찜하기</button>
                                </div>
                                <span>
                                    <button type="button" onClick={() => setIsChattingOn(!isChattingOn)}>
                                        {isChattingOn ? "채팅 닫기↪️" : "채팅 열기↩️"}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </section>
                    {/*chat area */}
                    <aside className={isChattingOn ? styles.chatAreaShow : styles.chatAreaHide} >

                        {/* chat render */}
                        <section className={styles.chatRenderArea}>
                            <div className={styles.chatLog}>
                                {chats.map((chat, idx) => <div key={idx}><b>{chat.id}</b> : {chat.chat}</div>)}
                            </div>
                        </section>

                        {/* chat input */}
                        <div className={isChattingOn ? `${styles.chatInput} ${styles.active}` : `${styles.chatInput}`}>
                            <input
                                id="chatInput"
                                placeholder="메시지 보내기"
                                autoComplete="off"
                                onKeyPress={(e) => pressEnter(e)} />
                            <button type="button" onClick={sendChat}>Send</button>
                        </div>
                    </aside>
                </main>

                {/* Linked item */}
                <section className={styles.linkedItemSection}>
                    <h2>현재 방송중인 상품</h2>

                    {/* item picture */}
                    <div className={styles.linkedItemEntry}>
                        <div className={styles.linkedItemImage} >
                        </div>

                        {/* item info*/}
                        <div className={styles.linkedItemInfo}>
                            <dl>
                                <dt>
                                    item title
                        </dt>
                                <dd>
                                    item description
                                    <div>{`${pageData.currnetPrice}원`} <s>{`${pageData.originalPrice}원`}</s></div>
                                    <div>
                                        <button type="button">상세페이지로 이동</button>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {

    if (context.params) {
        const pageData = await fetch(`http://localhost:3000/api/getDatas?id=${context.params.id}`)
            .then(res => res.json())

        return {
            props: {
                pageData
            }
        }
    }
    return {
        props: {
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const datas: Array<slideData> = getDatas("streaming");
    let paths = {
        paths: datas.map(data => {
            return {
                params: {
                    id: data.id
                }
            }
        }),
        fallback: false
    }
    return paths;
}

export default StreamingView;
