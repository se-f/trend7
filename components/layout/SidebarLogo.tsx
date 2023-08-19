import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={() => router.push("/")}
        className="
        rounded-full
        w-[200px]
        p-4
        flex
        items-center
        justify-center
        hover:bg-neutral-700
        hober: bg-opacity-10
        cursor-pointer
        transition
        hidden
        lg:block
        "
      >
        <img src="/images/logoW2.png" alt="logoW"></img>
        {/* <p className="text-white font-semibold text-2xl">FFF</p> */}
      </div>

      <div
        onClick={() => router.push("/")}
        className="
        rounded-full
        w-[60px]
        p-4
        flex
        items-center
        justify-center
        hover:bg-neutral-700
        hober: bg-opacity-10
        cursor-pointer
        transition
        lg:hidden
        "
      >
        <img src="/images/logoSW2.png" alt="logoW"></img>
        {/* <p className="text-white font-semibold text-2xl">FFF</p> */}
      </div>
    </div>
  );
};

export default SidebarLogo;
