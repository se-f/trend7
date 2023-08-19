import Followbar from "./layout/Followbar";
import Sidebar from "./layout/Sidebar";

import { Pivot as Hamburger } from "hamburger-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full pt-[20px] lg:pt-0 mx-auto xl:px-30 xl:max-w-7xl  max-w-6xl">
        <div className="grid grid-cols-4 h-full xl:grid-cols-5">
          <div className="col-span-1 flex flex-col ">

            <Sidebar />
          </div>
          <div className="col-span-3 xl:col-span-3 lg:col-span-2 border-[2px] border-neutral-800">
            {children}
          </div>
          <Followbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
