import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
function Layout() {


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex ">
        <Aside />
        <section className=" flex flex-1  flex-col">
          {/* Outlet me permite ubicar lo que se renderizará, ajeno a esto queda estatico */}
          <AnimatePresence mode="wait">
            <motion.div  className="w-full h-full flex-1"
            key={location.pathname}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}>
              <Outlet   />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
