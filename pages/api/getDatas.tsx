import fs from 'fs'
import { url } from 'inspector'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { slideData } from '../../interfaces/globalTypes'

export default async function getDatas(req: NextApiRequest, res: NextApiResponse) {
    const urlQuery = req.query.id
    let dataDir: string = path.join(process.cwd(), `public/streaming`)
    for (let target of fs.readdirSync(dataDir)) {
        if (urlQuery === target.split('.')[0]) {
            res.status(200).json({
                id: target,
                imgSrc: (path.join(`/${urlQuery}`, target)),
                linkTo: `/${urlQuery}/${target.split('.')[0]}`,
                title: `${target.split('.')[0]}님의 방송`,
                viewerCount: Number((Number(Math.random().toFixed(4)) * 10000).toFixed(0)),
                originalPrice: Number((Number(Math.random().toFixed(3)) * 3000000).toFixed(0)),
                currnetPrice: Number((Number(Math.random().toFixed(3)) * 1000000).toFixed(0))
            })
        }
    }
}