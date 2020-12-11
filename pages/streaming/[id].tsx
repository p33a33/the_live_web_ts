import { KeyboardEvent, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout"
import { slideData } from "../../interfaces/globalTypes";
import getDatas from "../../utils/getDatas";
import styles from '../../styles/streamingView.module.scss'

const StreamingView = ({ pageData }: { pageData: slideData }) => {

    const [isChattingOn, setIsChattingOn] = useState(false)
    const [chats, setChats] = useState<Array<{ id: string, chat: string }>>([])
    const [input, setInput] = useState<string>("")

    const sendChat = () => {
        if (input) {
            let temp = chats
            temp.push({ id: "tester", chat: input })
            setChats([...temp]);
            document.getElementById("chatInput").value = ""
            setInput("")
        } else {
            alert("메시지를 입력해주세요")
        }
    }

    const watchInput = (e: string) => {
        setInput(e)
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
                <main>
                    <section className={styles.streamPlayerSection}>
                        <div>
                            <video className={styles.videoPalyer}
                                controls
                                width="100%"
                                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                                autoPlay={false} />

                            {/* buttons, viewerCounter, streaming description*/}
                        </div>
                        <div>
                            {/* streaming title, viewerCount */}
                            <h1 className={styles.streamTitle}> {pageData.title} <small>{pageData.viewerCount}명 시청중</small> </h1>

                            {/* buttons*/}
                            <div className={styles.buttons}>
                                <div className={styles.itemOption}>
                                    <button type="button">카트에 담기</button>
                                    <button type="button">지금 구매하기</button>
                                    <button type="button">찜하기</button>
                                </div>
                                <span>
                                    <button type="button" onClick={() => setIsChattingOn(!isChattingOn)}>
                                        {isChattingOn ? "채팅 닫기" : "채팅 열기"}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </section>
                    {/*chat area */}
                    <aside className={isChattingOn ? styles.chatAreaShow : styles.chatAreaHide}>

                        {/* chat render */}
                        <section className={styles.chatRenderArea}>
                            <div className={styles.chatLog}>
                                {chats.map(chat => <div>{chat.id} : {chat.chat}</div>)}
                            </div>
                        </section>
                        {/* chat input */}
                        <div className={isChattingOn ? `${styles.chatInput} ${styles.active}` : `${styles.chatInput}`}>
                            <input
                                id="chatInput"
                                placeholder="메시지 보내기"
                                onChange={(e) => watchInput(e.target.value)}
                                autoComplete="off"
                                onKeyPress={(e) => pressEnter(e)} />
                            <button type="button" onClick={sendChat}>send</button>
                        </div>
                    </aside>
                </main>
                <hr />
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
                                <div><button type="button">상세페이지에서 만나보기</button></div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const pageData = await fetch(`http://localhost:3000/api/getDatas?id=${params.id}`)
        .then(res => res.json())

    return {
        props: {
            pageData
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    const datas: Array<slideData> = getDatas("streaming");

    return {
        paths: datas.map(data => {
            return {
                params: {
                    id: data.id
                }
            }
        }),
        fallback: false
    }
}

export default StreamingView;
