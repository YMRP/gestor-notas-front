import { Outlet } from "react-router-dom";
import notesImg from "../assets/img/notes.png";
import TypingText from "../utils/TypingText";
import { motion } from "framer-motion";

function Login() {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-black">
      <section className="flex flex-1 items-center justify-center bg-black p-6">
        <Outlet />
      </section>

      <section className="flex flex-1 flex-col items-center justify-center picColor p-6">
        <div className="text-center space-y-4 ">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl">
            Gestor De Notas
          </h1>
          <TypingText />
        </div>

        <motion.img
          src={notesImg}
          alt="Picture"
          className="w-3/4 max-w-md md:w-2/3 lg:w-1/2 object-contain mt-2 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </section>
    </div>
  );
}

export default Login;
