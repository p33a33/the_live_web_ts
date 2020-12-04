import { useState, useEffect, useRef } from "react"
import BannerSlide from "./bannerSlide"
import styles from './banner.module.scss'


const BannerCarousel = ({ images }: { images: Array<string> }) => {

    let Total_slide: number = images.length - 1;
    let [currentSlide, setCurrentSlide] = useState<number>(0)
    let slideRef = useRef(null);

    let nextSlide = () => {
        if (currentSlide >= Total_slide) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    let prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(Total_slide);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
        setTimeout(() => nextSlide(), 4000)
    }, [currentSlide])


    return (
        <>
            <div className={styles.container}>
                <div className={styles.slideContainer} ref={slideRef}>
                    {images.map((image, idx) => <BannerSlide img={image} key={idx} />)}
                </div>
            </div>
            <button onClick={prevSlide}>{"\<"}</button>
            <button onClick={nextSlide}>{"\>"}</button>
            <span>{currentSlide + 1}/{Total_slide + 1}</span>
        </>
    )
}

export default BannerCarousel;