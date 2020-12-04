import styles from './banner.module.scss'

const BannerSlide = ({ img }: { img: string }) => {
    return (
        <img className={styles.image} src={img} />
    )
}

export default BannerSlide;