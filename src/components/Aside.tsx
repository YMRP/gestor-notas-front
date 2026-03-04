import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdNoteAdd, MdViewList } from "react-icons/md";
import { FaHome, FaUserCircle, FaCog } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMdInformationCircle } from "react-icons/io";
import OptionAside from "./OptionAside";

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
    <aside
      className="
        flex 
        flex-wrap md:flex-nowrap
        flex-row md:flex-col
        items-center
        justify-center 
        gap-2 md:gap-4
        bg-black
        text-xs
        font-light
        text-cyan-50
        w-full md:w-24
        md:min-h-screen
        py-2 md:py-4
        px-2 md:px-0
        overflow-visible
        md:h-screen
        md:justify-center
        md:overflow-hidden
        md:min-w-0
      "
    >
      {/* Sesión */}
      <div
        className="relative flex flex-col items-start  md:justify-between cursor-pointer md:w-full "
        onMouseLeave={() => setPress(false)}
        onClick={() => setPress(!press)}
      >
        <OptionAside
          text={"Sesión"}
          ReactIcon={<FaCog size={25} />}
          showTextOnMobile={false} // (Opcional, ajustar en OptionAside)
        />
        {press && (
          <div
            className="
            md:pt-4
              absolute md:static
              top-full md:top-auto
              left-0 md:left-auto
              bg-black md:bg-transparent
              flex flex-col
              gap-3
              mt-2 md:mt-0
              rounded-md
              shadow-lg md:shadow-none
              z-50
              w-full max-md:w-40
              max-md:px-3 max-md:py-2
              md:justify-center
            "
          >
            <button onClick={exit} className="md:w-full min-w-0 ">
              <OptionAside
                text={"Cerrar sesión"}
                ReactIcon={<ImExit size={20} />}
              />
            </button>
            <Link to={"user"} className="min-w-0">
              <OptionAside
                text={"Usuario"}
                ReactIcon={<FaUserCircle size={20} />}
              />
            </Link>
          </div>
        )}
      </div>

      {/* Links principales */}
      <Link to={"dashboard"} className="md:w-full justify-center ">
        <OptionAside
          text={"Inicio"}
          ReactIcon={<FaHome size={25} />}
          showTextOnMobile={false}
        />
      </Link>
      <Link to={"show-notes"} className="md:w-full justify-center">
        <OptionAside
          text={"Mis notas"}
          ReactIcon={<MdViewList size={25} />}
          showTextOnMobile={false}
        />
      </Link>
      <Link to={"create-note"} className="md:w-full justify-center">
        <OptionAside
          text={"Agregar nota"}
          ReactIcon={<MdNoteAdd size={25} />}
          showTextOnMobile={false}
        />
      </Link>
      <Link to={"about"} className="md:w-full justify-center">
        <OptionAside
          text={"Acerca de..."}
          ReactIcon={<IoMdInformationCircle size={25} />}
          showTextOnMobile={false}
        />
      </Link>
    </aside>
  );
}

export default Aside;
