import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { PuffLoader } from "react-spinners";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <PuffLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header label={fetchedUser?.name} showBackArrow />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string}/>
        </>
    )

}
export default UserView;