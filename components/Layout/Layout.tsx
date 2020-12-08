import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.scss'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false)

  const hamburgerButtonHandler = () => {
    setIsMenuClicked(!isMenuClicked)
  }

  useEffect(hamburgerButtonHandler, [children]) // 햄버거 메뉴 렌더 후 페이지 이동시 isMenuClicke 상태가 false로 전환됩니다.

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href={"/"}><a><div className={styles.logo}>THE LIVE</div></a></Link>

          {/* 햄버거 버튼은 모바일 환경(639px)이하에서 활성화됩니다. */}
          <button className={styles.hamburgerButton} type="button" onClick={hamburgerButtonHandler}>
            <div className={styles.burgerLine} />
            <div className={styles.burgerLine} />
            <div className={styles.burgerLine} />
          </button>

          {/* 태블릿 이상의 환경에서는 nav에 메뉴가 표시됩니다. */}
          <ul className={`${styles.menu} ${isMenuClicked ? styles.clickedMenu : ""}`} onClick={hamburgerButtonHandler}>
            <li><Link href={"/"}><a>홈</a></Link></li>
            <li><Link href={"/StreamingList"}><a>방송목록</a></Link></li>
            <li><Link href={"/ItemList"}><a>상품목록</a></Link></li>
            <li><Link href={"/Mypage"}><a>마이페이지</a></Link></li>
            <li><Link href={"/Signin"}><a>로그인</a></Link></li>
          </ul>
        </nav>
      </header>
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
    </div>
  )
}

export default Layout
