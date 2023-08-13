import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import { mutate } from "swr";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);

    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete("/api/follow", { params: { userId } });
            }

            else {

                request = () => axios.post("/api/follow", { userId });


                // For those who had issues with the unfollow functionality, you need to change how the DELETE method is sent in the hook.
                //It should be passed as a parameter like this:

                //                 request = () => axios.delete('/api/follow', { params: { userId } });

                // In the API, it should be noted that when it's not a POST (follow) request, use req.query instead of req.body because
                //  Axios treats DELETE and POST differently. This results in:

                //                 const userId = req.method === 'POST' ? req.body.userId : req.query.userId;

            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Success!");

        } catch (e) {
            toast.error("Something went wrong! (F01)");
            console.log(e);

        }

    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return { isFollowing, toggleFollow }
}
export default useFollow;