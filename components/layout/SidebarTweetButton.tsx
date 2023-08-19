import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick}>
      <div
        className="
            mt-3
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-purple-700
            hover:bg-opacity-80
            transition
            cursor-pointer"
      >
        <FaFeather size={24} color="white" />
      </div>

      <div
        className="
            mt-3
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-purple-700
            hover:bg-opacity-80
            transition
            cursor-pointer
            "
      >
        <p
          className="
                hidden
                lg:block
                text-center
                font-semibold
                text-white
                text-[18px]"
        >
          Whats up?
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
