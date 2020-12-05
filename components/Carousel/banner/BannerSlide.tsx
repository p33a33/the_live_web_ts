import Router from 'next/router'
import { slideData } from '../../../interfaces/globalTypes';
import styles from './banner.module.scss'


const BannerSlide = ({ data }: { data: slideData }) => {

    return (
        <img className={styles.image} src={data.imgSrc} onClick={() => Router.push(data.linkTo)} />
    )
}

export default BannerSlide;