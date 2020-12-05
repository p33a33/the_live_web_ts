// import Link from 'next/link'
import styles from '../styles/mainpage.module.scss'
import Layout from '../components/Layout/Layout'
import BannerCarousel from '../components/Carousel/banner/BannerCarousel'
import ShortCarousel from '../components/Carousel/ShortCarousel'
import getDatas from '../utils/getDatas'
import { GetStaticProps } from 'next'
import { slideData } from '../interfaces/globalTypes'

interface mainProps {
  banner: Array<slideData>,
  streaming: Array<slideData>,
  item: Array<slideData>
}


const Mainpage = ({ banner, streaming, item }: mainProps) => {

  return (
    <Layout title="Welcome to The Live">
      <section className={styles.banner}>
        <BannerCarousel datas={banner} />
      </section>
      <section className={styles.streaming}>
        <div className={styles.sectionTitle}>🔥️현재 가장 핫한 방송들 </div>
        <ShortCarousel carouselType="streaming" datas={streaming} />
      </section>
      <section className={styles.item}>
        <div className={styles.sectionTitle}>🚀️주문 폭주! 일주일간 가장 많이 팔렸어요!</div>
        <ShortCarousel carouselType="item" datas={item} />
      </section>
    </Layout>
  )
}

export default Mainpage

export let getStaticProps: GetStaticProps = async () => {

  let banner = getDatas("banner");
  let streaming = getDatas("streaming");
  let item = getDatas("item")

  return {
    props: {
      banner,
      streaming: streaming.sort((a, b) => b.viewerCount - a.viewerCount),
      item
    }
  }
}