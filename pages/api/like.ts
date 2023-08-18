import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/PrismaDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST" && req.method != "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId != "string") {
      throw new Error("Invalid post ID (POS2)");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid post ID (POS3)");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method == "POST") {
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your post :)",
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true, 
            },
          });
        }
      } catch (e) {
        console.log("ERROR N02");
        console.log(e);
      }
    }

    if (req.method == "DELETE") {
      updatedLikedIds = updatedLikedIds.filter((id) => id != currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    return res.status(200).json(updatedPost);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
