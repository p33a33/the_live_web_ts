import { useState, useEffect, useRef } from "react"
import StreamingSlide from "./streaming/StreamingSlide"
import ItemSlide from "./item/ItemSlide"
import styles from './shortCarousel.module.scss'
import { carouselType, slideData } from "../../interfaces/globalTypes"
import { useSwipeable } from 'react-swipeable'

const ShortCarousel = ({ carouselType, datas }: { carouselType: carouselType, datas: Array<slideData> }) => {

    let [currentSlide, setCurrentSlide] = useState<number>(0)

    let TOTAL_SLIDE: number = 0;

    useEffect(() => {
        if (window.innerWidth > 1279) {
            switch (carouselType) {
                case "streaming": TOTAL_SLIDE = datas.length / 2; break;
                case "item": TOTAL_SLIDE = datas.length / 4; break;
            }
        } else if (window.innerWidth > 639) {
            switch (carouselType) {
                case "streaming": TOTAL_SLIDE = datas.length; break;
                case "item": TOTAL_SLIDE = datas.length / 2; break;
            }
        } else {
            switch (carouselType) {
                case "item": TOTAL_SLIDE = datas.length; break;
            }
        }
    })


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
            <div className={styles.container} {...swipeHandler} >
                <div className={styles.slideContainer} ref={slideRef}>
                    {carouselType === "streaming" ?
                        datas.map((data, idx) => <StreamingSlide data={data} key={idx} />)
                        : datas.map((data, idx) => <ItemSlide data={data} key={idx} />)}
                </div>
            </div>
            <div className={styles.buttonLine}>
                <img className={styles.buttonImg} src={"./buttons/prevArrow.png"} alt={"prev"} onClick={prevSlide} />
                <img className={styles.buttonImg} src={"./buttons/nextArrow.png"} alt={"next"} onClick={nextSlide} />
            </div>
        </>
    )
}

export default ShortCarousel;