import { slideData } from "../../../interfaces/globalTypes";
import Router from "next/router"
import styles from "./item.module.scss"

const ItemSlide = ({ data }: { data: slideData }) => {

    function addComma(num: number) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }

    return (
        <div className={styles.slideContainer} onClick={() => Router.push(data.linkTo)} >
            <img className={styles.image} src={data.imgSrc} />
            <dl>
                <dt className={styles.title} style={{ textAlign: "center" }}>{data.title}</dt>
                <dd style={{ textAlign: "center" }}>
                    <div className={styles.price}>{`${addComma(data.currnetPrice)}원`} <span style={{ textDecoration: "line-through" }}>{`${addComma(data.originalPrice)}원`}</span></div>
                </dd>
            </dl>
        </div>
    )
}

export default ItemSlide;