export interface slideData {
    id: string,
    imgSrc: string,
    linkTo: string,
    title: string,
    viewerCount: number,
    originalPrice: number,
    currnetPrice: number,
}

export type carouselType = "banner" | "streaming" | "item"