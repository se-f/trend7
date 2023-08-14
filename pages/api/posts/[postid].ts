import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/PrismaDB"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method != "GET") {
        return res.status(405).end()
    }

    try {


        const { postid } = req.query


        if (!postid || typeof postid !== "string") {
            throw new Error("Invalid post id (POS1)")
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postid
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        return res.status(200).json(post)


    }
    catch (e) {
        console.log(e)
        return res.status(400).end()
    }
}