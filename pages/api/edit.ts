import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/PrismaDB"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method != 'PATCH') {
        console.log("METHOD NOT ALLOWED (edit.ts)") 
        return res.status(405).end();
    }

    try{
        const {currentUser} = await serverAuth(req,res);

        const { name, username, bio, profileImage, coverImage  } = req.body;

        if(!name || !username){
            throw new Error ("Missing fields")
        }

        const updatedUser = await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })

        return res.status(200).json(updatedUser);
    }
    catch(e){
        console.log(e)
        res.status(400).end();
    }

}