import { Link } from "react-router-dom";
import { getUserFromToken } from "../utils/getUserFromToken";
function Dashboard() {
  const user = getUserFromToken();
  console.log(user);
  return (
    <div className="relative min-h-screen w-full max-md:overflow-x-hidden">
      {/* Content */}

      <div className="relative p-4 flex flex-col items-center justify-center gap-6 min-h-screen text-center text-black">
        <h1 className="text-5xl font-bold">¡Hola, {user?.name}!</h1>

        <p className="text-2xl">
          Gestiona todas tus notas personales a tu gusto con las siguientes
          acciones:
        </p>

        <div className="grid grid-cols-2 place-items-center gap-5 font-bold w-full md:flex md:justify-center ">
          <Link to={"/create-note"} className="max-md:w-full">
            <button className="bg-amber-400 p-6 text-amber-900 hover:bg-amber-200 duration-200 w-full cursor-pointer">
              Agregar
            </button>
          </Link>

          <Link to={"/show-notes"} className="max-md:w-full">
            <button className="bg-red-400 p-6 text-red-900 hover:bg-red-200 duration-200 w-full cursor-pointer">
              Modificar
            </button>
          </Link>

          <Link to={"/show-notes"} className="max-md:w-full">
            <button className="bg-blue-400 p-6 text-blue-900 hover:bg-blue-200 duration-200 w-full cursor-pointer">
              Consultar
            </button>
          </Link>

          <Link to={"/show-notes"} className="max-md:w-full">
            <button className="bg-green-400 p-6 text-green-900 hover:bg-green-200 duration-200 w-full cursor-pointer">
              Eliminar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
