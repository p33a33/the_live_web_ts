import { slideData } from "../../interfaces/globalTypes"
import { useState } from "react"
import styles from "./TrendingStreamingList.module.scss"
import TrendingStreamingEntry from './TrendingStreamingEntry'
import { useSwipeable } from 'react-swipeable'

const TrendingStreamingList = ({ datas }: { datas: Array<slideData> }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const LAST_PAGE: number = Number((datas.length / 5).toFixed(0))

    const nextPage = () => {
        if (currentPage !== LAST_PAGE) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(1)
        }
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        } else {
            setCurrentPage(LAST_PAGE)
        }
    }

    const swipeHandler = useSwipeable({ onSwipedLeft: nextPage, onSwipedRight: prevPage })

    return (
        <div className={styles.container}>
            <img className={styles.buttonImg} src={"./buttons/prevArrow.png"} alt={"prev"} onClick={prevPage} />
            <ul {...swipeHandler}>
                {datas.map((data, index) => {
                    if (index < currentPage * 5 && index >= (currentPage - 1) * 5) {
                        return <li><TrendingStreamingEntry data={data} /></li>
                    }
                })}
            </ul>
            <img className={styles.buttonImg} src={"./buttons/nextArrow.png"} alt={"next"} onClick={nextPage} />
        </div>
    )
}

export default TrendingStreamingList;