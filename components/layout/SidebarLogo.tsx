import { useRouter } from "next/router";
import Image from "next/image";
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
        <Image src="/images/logoW2.png" alt="logoW" height="200" width="200" />
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
        <Image alt="LOGOSW2" src="/images/logoSW2.png" width="50" height='50' />
        {/* <p className="text-white font-semibold text-2xl">FFF</p> */}
      </div>
    </div>
  );
};

export default SidebarLogo;
