import React, { ReactNode, useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.scss'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

    const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false)
    const [isModalOn, setIsModalOn] = useState<boolean>(false)

    const menus: Array<{ title: string, url: string }> = [
        { title: "홈", url: "/" },
        { title: "방송목록", url: "/streaming/StreamingList" },
        { title: "방송하기", url: "/streaming/onAir" },
        { title: "상품목록", url: "/ItemList" },
        { title: "마이페이지", url: "/Mypage" },
    ]

    const menuOnHandler = () => {
        setIsMenuClicked(true)
    }

    const menuOffHandler = () => {
        setIsMenuClicked(false)
    }

    const modalHandler = () => {
        setIsModalOn(!isModalOn)
    }

    useEffect(() => {
        menuOffHandler()
    }, [children]) // 햄버거 메뉴 렌더 후 페이지 이동시 isMenuClicke 상태가 false로 전환됩니다.

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <button className={styles.logo} onClick={() => Router.push("/")}>THE LIVE</button>

                    {/* 햄버거 버튼은  태블릿 이하 환경 (1279px)이하에서 활성화됩니다. */}
                    <button className={styles.hamburgerButton} type="button" onClick={menuOnHandler}>
                        <div className={styles.burgerLine} />
                        <div className={styles.burgerLine} />
                        <div className={styles.burgerLine} />
                    </button>

                    {/* 데스크탑 환경(1280px 이상)에서는 nav에 메뉴가 표시됩니다. 메뉴 닫기버튼 혹은 메뉴 이외의 곳을 클릭하면 메뉴를 닫습니다.*/}
                    <div className={isMenuClicked ? `${styles.menuLayer}` : `${styles.hideLayer}`} onClick={menuOffHandler} />
                    <ul className={`${styles.menu} ${isMenuClicked ? styles.clickedMenu : ""}`}>
                        {menus.map((menu, idx) => <li key={idx}>
                            <button type="button" onClick={() => Router.push(menu.url)}>{menu.title}</button>
                        </li>)}
                        <li>
                            <button type="button" onClick={modalHandler}>로그인</button>
                        </li>
                        <li style={{ display: isMenuClicked ? "block" : "none" }}>
                            <button type="button" onClick={menuOffHandler}>메뉴 닫기</button>
                        </li>
                    </ul>
                </nav>
            </header>

            {/*  Signin Modal */}
            <div className={styles.modalWrap} style={{ display: isModalOn ? "flex" : "none" }} onClick={modalHandler}>
                <div className={styles.signinModal} onClick={(e) => e.stopPropagation()}> {/* 하위 엘리먼트 클릭시 이벤트 버블링으로 모달창이 꺼지기때문에 이벤트 전달을 막았습니다*/}
                    <form className={styles.signinForm} onSubmit={(e) => { e.preventDefault(); console.log("sigin clicked") }}>
                        <div className={styles.logo}>THE LIVE</div>
                        <div className={styles.inputArea}>
                            <label htmlFor="email">이메일 </label>
                            <input name="id" placeholder="ex) example@abc.co.kr" type="email" id="email" />
                            <label htmlFor="password"> 비밀번호</label>
                            <input name="password" placeholder="비밀번호(숫자, 특수문자를 포함한 7~13글자)" type="password" id="password" />
                        </div>
                        <div className={styles.buttonArea}>
                            <button type="submit">로그인</button>
                            <button type="button">아직 회원이 아니신가요?</button>
                            <button type="button" onClick={modalHandler}>닫기❌️</button>
                        </div>
                    </form>
                </div>

            </div>
            {children}
            <footer className={styles.footer}>
                <div>개발자 : 조성민</div>
                <div>문의사항 : p33a33@gmail.com</div>
                <div className={styles.info}>
                    <Link href="https://github.com/p33a33/the_live_web_ts"><a>Git Repo</a></Link>
                    <Link href="/resume/myResume.pdf"><a>Resume</a></Link>
                    <Link href="https://growupcho.tistory.com/"><a>Blog</a></Link>
                </div>
            </footer>
        </div >
    )
}

export default Layout;