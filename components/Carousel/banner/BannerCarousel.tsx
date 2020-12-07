import { useState, useEffect, useRef } from "react"
import BannerSlide from "./BannerSlide"
import styles from './banner.module.scss'
import { slideData } from "../../../interfaces/globalTypes"
import { useSwipeable } from 'react-swipeable'

const BannerCarousel = ({ datas }: { datas: Array<slideData> }) => {

    let TOTAL_SLIDE: number = datas.length

    let [currentSlide, setCurrentSlide] = useState<number>(0)
    let slideRef = useRef(null);

    let nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDE - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    let prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDE - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = "all 0.7s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }, [currentSlide])

    const swipeHandler = useSwipeable({ onSwipedLeft: nextSlide, onSwipedRight: prevSlide })

    return (
        <>
            <div className={styles.container} {...swipeHandler}>
                <div className={styles.slideContainer} ref={slideRef}>
                    {datas.map((data, idx) => <BannerSlide data={data} key={idx} />)}
                </div>
            </div>
            <div className={styles.buttonLine}>
                <img className={styles.buttonImg} src={"./buttons/prevArrow.png"} alt={"prev"} onClick={prevSlide} />
                <span>{currentSlide + 1}/{TOTAL_SLIDE}</span>
                <img className={styles.buttonImg} src={"./buttons/nextArrow.png"} alt={"next"} onClick={nextSlide} />
            </div>
        </>
    )
}

export default BannerCarousel;