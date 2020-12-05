import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.scss'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={"/"}><a><div className={styles.logo}>THE LIVE</div></a></Link>
        <div className={styles.menu}>
          <Link href={"/StreamingList"}><a>방송목록</a></Link>
          <Link href={"/ItemList"}><a>상품목록</a></Link>
          <Link href={"/Mypage"}><a>마이페이지</a></Link>
          <Link href={"/Signin"}><a>로그인</a></Link>
        </div>
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

export default Layout
