import { MdNoteAdd } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import OptionAside from "./OptionAside";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function Aside() {
  const navigate = useNavigate();

  function exit() {
    const confirmLogout = window.confirm("¿Deseas cerrar la sesión?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <aside className=" flex flex-col gap-5 bg-linear-to-b from-blue-500 to-blue-700 min-h-full text-cyan-50 justify-center ">
      <button onClick={exit}>
        <OptionAside ReactIcon={<ImExit size={40} />} />
      </button>
      <Link to={"dashboard"}>
        <OptionAside ReactIcon={<FaHome size={40} />} />
      </Link>
      <Link to={"show-notes"}>
        <OptionAside ReactIcon={<MdViewList size={40} />} />
      </Link>

      <Link to={'create-note'}>
        <OptionAside ReactIcon={<MdNoteAdd size={40} />} />
      </Link>
    </aside>
  );
}

export default Aside;
