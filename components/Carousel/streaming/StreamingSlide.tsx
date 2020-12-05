import { slideData } from "../../../interfaces/globalTypes";
import Router from "next/router"
import styles from "./streaming.module.scss"

const StreamingSlide = ({ data }: { data: slideData }) => {

    function addComma(num: number) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }

    return (
        <div>
            <img className={styles.image} src={data.imgSrc} onClick={() => Router.push(data.linkTo)} />
            <div style={{ textAlign: "center" }}>{data.title}</div>
            <div style={{ textAlign: "center" }}>
                <div>{addComma(data.viewerCount)}명 시청중</div>
            </div>
        </div>
    )
}

export default StreamingSlide;