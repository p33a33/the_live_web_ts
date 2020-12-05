import { useState, useEffect, useRef } from "react"
import BannerSlide from "./BannerSlide"
import styles from './banner.module.scss'
import { slideData } from "../../../interfaces/globalTypes"

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

    return (
        <>
            <div className={styles.container}>
                <div className={styles.slideContainer} ref={slideRef}>
                    {datas.map((data, idx) => <BannerSlide data={data} key={idx} />)}
                </div>
            </div>
            <div className={styles.navigator}>
                <button onClick={prevSlide}>{"\<"}</button>
                <button onClick={nextSlide}>{"\>"}</button>
                <span>{currentSlide + 1}/{TOTAL_SLIDE}</span>
            </div>
        </>
    )
}

export default BannerCarousel;