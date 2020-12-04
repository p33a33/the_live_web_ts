// import Link from 'next/link'
// import styles from '../styles/mainpage.module.scss'
import Layout from '../components/Layout'
import BannerCarousel from '../components/bannerCarousel/bannerCarousel'
import getBanners from '../utils/getBanners'
import { GetStaticProps } from 'next'

const Mainpage = ({ images }: { images: Array<string> }) => {
  return (
    <Layout title="Welcome to The Live">
      <section>
        <BannerCarousel images={images} />
      </section>
    </Layout>
  )
}

export default Mainpage

export let getStaticProps: GetStaticProps = async () => {
  let banners = getBanners();

  return {
    props: {
      images: banners
    }
  }
}