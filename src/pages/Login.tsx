import { Outlet } from "react-router-dom";
import notesImg from "../assets/img/notes.png";
import TypingText from "../utils/TypingText";
import { motion } from "framer-motion";

function Login() {
  return (
    <div className="flex h-screen bg-black">
      <section className="flex flex-1 flex-col items-center justify-center bg-black ">
        {/* <LoginForm/> */}
        <Outlet />
      </section>
      <section className="flex flex-1 min-h-screen picColor flex-col items-center">
        <div className="text-center flex flex-1 flex-col justify-center gap-4 ">
          <h1 className="font-bold text-6xl">Gestor De Notas</h1>
          <TypingText />
        </div>

        <motion.img
          src={notesImg}
          alt="Picture"
          className="h-lh object-contain flex flex-1"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        ></motion.img>
      </section>
    </div>
  );
}

export default Login;
