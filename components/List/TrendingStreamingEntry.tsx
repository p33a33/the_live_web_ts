import { slideData } from "../../interfaces/globalTypes";
import styles from './TrendingStreamingEntry.module.scss'

const TrendingStreamingEntry = ({ data }: { data: slideData }) => {
    return <div className={styles.entry}>
        <img className={styles.entryImg} src={data.imgSrc} alt="추천스트리밍" />
        <dl>
            <dt>{data.title}</dt>
            <dd>{data.viewerCount}명 시청중</dd>
        </dl>
    </div>
}

export default TrendingStreamingEntry;