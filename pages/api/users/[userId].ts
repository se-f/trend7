import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/PrismaDB"

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method != "GET") {
        return res.status(405).end()
    }

    try {
        const userId = req.query;
        console.log("userId=");
        console.log(userId);
        if (!userId || typeof userId != "string") {
            console.log("INVALID ID IN: [userID].ts")
            throw new Error("Invalid user id")
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const followersCount = prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return res.status(200).json({ ...existingUser, followersCount });
    }
    catch (e) {
        console.log(e)
        return res.status(400).end()
    }
}