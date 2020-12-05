import { useState, useEffect, useRef } from "react"
import StreamingSlide from "./streaming/StreamingSlide"
import ItemSlide from "./item/ItemSlide"
import styles from './shortCarousel.module.scss'
import { carouselType, slideData } from "../../interfaces/globalTypes"

const ShortCarousel = ({ carouselType, datas }: { carouselType: carouselType, datas: Array<slideData> }) => {

    let TOTAL_SLIDE: number = 0;

    switch (carouselType) {
        case "streaming": TOTAL_SLIDE = datas.length / 2; break;
        case "item": TOTAL_SLIDE = datas.length / 4; break;
    }

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
                    {carouselType === "streaming" ?
                        datas.map((data, idx) => <StreamingSlide data={data} key={idx} />)
                        : datas.map((data, idx) => <ItemSlide data={data} key={idx} />)}
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

export default ShortCarousel;