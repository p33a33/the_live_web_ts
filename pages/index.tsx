import styles from '../styles/mainpage.module.scss'
import BannerCarousel from '../components/Carousel/banner/BannerCarousel'
import ShortCarousel from '../components/Carousel/ShortCarousel'
import getDatas from '../utils/getDatas'
import { GetStaticProps } from 'next'
import { slideData } from '../interfaces/globalTypes'
import TrendingStreamingList from '../components/List/TrendingStreamingList'

interface mainProps {
    banner: Array<slideData>,
    streaming: Array<slideData>,
    item: Array<slideData>
}


const Mainpage = ({ banner, streaming, item }: mainProps) => {

    return (
        <>
            <section className={styles.banner}>
                <BannerCarousel datas={banner} />
            </section>
            <section className={styles.streaming}>
                <div className={styles.sectionTitle}>🔥️현재 가장 핫한 방송들 </div>
                <div className={styles.streamingCarousel}><ShortCarousel carouselType="streaming" datas={streaming} /></div>
                <div className={styles.streamingList}><TrendingStreamingList datas={streaming} /></div>
            </section>
            <section className={styles.item}>
                <div className={styles.sectionTitle}>🚀️주문 폭주! 일주일간 가장 많이 팔렸어요!</div>
                <ShortCarousel carouselType="item" datas={item} />
            </section>
        </>
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