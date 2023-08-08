import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
    const router = useRouter();
    return (
        <div onClick={() => { router.push('/') }}>
            <div className="
            mt-3
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-sky-500
            hover:bg-opacity-80
            transition
            cursor-pointer">
                <FaFeather size={24} color="white" />
            </div>

            <div className="
            mt-3
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-sky-500
            hover:bg-opacity-80
            transition
            cursor-pointer
            ">
                <p className="
                hidden
                lg:block
                text-center
                font-semibold
                text-white
                text-[18px]">What's up?</p>
            </div>
        </div>
    )
}

export default SidebarTweetButton;