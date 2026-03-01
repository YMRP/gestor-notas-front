import Aside from "./Aside";

import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      {/* <Header /> */}
      <main className="flex-1 flex min-h-0 ">
        <Aside />
        <section className=" flex flex-1  flex-col overflow-y-auto  bg-[url('/background.svg')] bg-cover bg-center">
            {/* //Background */}
      {/* inset es top: 0;
right: 0;
bottom: 0;
left: 0; */}
      {/* <div className="absolute inset-0 -z-10">
        <img src="/background.svg" alt="Bakcground" className="w-full h-full object-cover" />
      </div> */}

          {/* Outlet me permite ubicar lo que se renderizará, ajeno a esto queda estatico */}

          <Outlet />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
