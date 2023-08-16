import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/PrismaDB"

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {

    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(405).end()
    }

    try {
        const userId = req.method === 'POST' ? req.body.userId : req.query.userId;

        const { currentUser } = await serverAuth(req, res)

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID follow.ts")
        };

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("Invalid ID follow.ts (2)")

        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method == "POST") {
            updatedFollowingIds.push(userId);
        }

        if (req.method == "DELETE") {
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { followingIds: updatedFollowingIds }
        })
        return res.status(200).json(updatedUser)
    }
    catch (e) {
        console.log(e)
        return res.status(400).end()
    }
}