import fs from 'fs'
import path from 'path'
import { carouselType, slideData } from '../interfaces/globalTypes'

export default function getDatas(carouselType: carouselType) {
    let dataDir: string = path.join(process.cwd(), `public/${carouselType}`)
    let dataFiles: Array<slideData> = fs.readdirSync(dataDir).map(file => {
        return {
            imgSrc: (path.join(`/${carouselType}`, file)),
            linkTo: "/StreamingList",
            title: "test",
            viewerCount: Number((Number(Math.random().toFixed(4)) * 10000).toFixed(0)),
            originalPrice: Number(Number(Math.random().toFixed(3)) * 3000000).toFixed(0),
            currnetPrice: Number(Number(Math.random().toFixed(3)) * 1000000).toFixed(0)
        }
    })
    return dataFiles;
}