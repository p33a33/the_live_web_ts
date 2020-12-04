import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <nav style={{ display: "flex", width: "100%" }}>
        <div>
          <Link href={"/"}><a>Home</a></Link> {" "} | {" "}
          <Link href={"/StreamingList"}><a>방송 목록</a></Link> {" "} | {" "}
          <Link href={"/ItemList"}><a>상품 목록</a></Link> {" "} | {" "}
          <Link href={"/Mypage"}><a>마이페이지</a></Link>
        </div>
        <div>
          <Link href={"/Signin"}><a>로그인</a></Link>
        </div>
      </nav>
    </header>
    <hr />
    {children}
    <footer>
      <hr />
      <div>footer here</div>
    </footer>
  </div>
)

export default Layout
