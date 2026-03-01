import { MdNoteAdd } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import OptionAside from "./OptionAside";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMdInformationCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

function Aside() {
  const navigate = useNavigate();
  const [press, setPress] = useState(false);

  function exit() {
    const confirmLogout = window.confirm("¿Deseas cerrar la sesión?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <aside className=" flex flex-col gap-3 bg-linear-to-b text-xs font-light bg-black h-screen  text-cyan-50 justify-center transition duration-200 ">
      <button
        onMouseLeave={() => {
          setPress(false);
        }}
        onClick={() => {
          press ? setPress(false) : setPress(true);
        }}
      >
        <OptionAside text={"Sesión"} ReactIcon={<FaCog size={25} />} />
        {press ? (
          <div className="flex flex-col gap-5 mt-5 duration-200 ">
            <button onClick={exit}>
              <OptionAside
                text={"Cerrar sesión"}
                ReactIcon={<ImExit size={25} />}
              />
            </button>
            <Link to={"user"}>
              <OptionAside
                text={"Usuario"}
                ReactIcon={<FaUserCircle size={25} />}
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </button>

      <Link to={"dashboard"}>
        <OptionAside text={"Inicio"} ReactIcon={<FaHome size={25} />} />
      </Link>
      <Link to={"show-notes"}>
        <OptionAside text={"Mis notas"} ReactIcon={<MdViewList size={25} />} />
      </Link>

      <Link to={"create-note"}>
        <OptionAside
          text={"Agregar nota"}
          ReactIcon={<MdNoteAdd size={25} />}
        />
      </Link>

      <Link to={"about"} >
        <OptionAside
          text={"Acerca de..."}
          ReactIcon={<IoMdInformationCircle size={25} />}
        />
      </Link>
    </aside>
  );
}

export default Aside;
