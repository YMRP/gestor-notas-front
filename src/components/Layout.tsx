import Aside from "./Aside";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">

      <Aside />

      <main className="
        flex-1
        overflow-y-auto
        bg-[url('/background.svg')] 
        bg-cover 
        bg-center min-h-0
      ">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;
