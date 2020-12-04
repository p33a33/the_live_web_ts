import fs from 'fs'
import path from 'path'

export default function getBanners() {
    let bannerDir: string = path.join(process.cwd(), "public/bannerImgs")
    let bannerFiles: Array<string> = fs.readdirSync(bannerDir).map(file => (path.join("/bannerImgs", file)))

    return bannerFiles;
}