import { Outlet } from "react-router-dom";
import notesImg from "../assets/img/notes.png";

function Login() {
  return (
    <div className="flex  ">
      <section className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-blue-400 to-blue-700 ">
        {/* <LoginForm/> */}
        <Outlet/>
      </section>
      <section
        className="flex flex-1 min-h-screen bg-center bg-contain bg-no-repeat picColor"
        style={{ backgroundImage: `url(${notesImg})` }}
      ></section>
    </div>
  );
}

export default Login;
