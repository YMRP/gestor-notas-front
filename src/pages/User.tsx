import { useEffect, useState } from "react";
import Title from "../components/Title";
import { toast } from "sonner";
import axios from "axios";
import { getUserFromToken } from "../utils/getUserFromToken";
import { MdModeEdit } from "react-icons/md";

function User() {
  const URLBACKEND = import.meta.env.VITE_BACKEND_URL;
  const user = getUserFromToken();
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");


  async function getUserData() {
    try {
      const response = await axios.get(`${URLBACKEND}api/users/${user?.id}`);
      console.log(response);
    } catch (error: any) {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      <Title text={"Usuario"} />

      <section className="mt-8 w-full max-w-md bg-white/90  rounded shadow-lg p-8 border border-gray-200">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div >
              <p className="text-sm text-gray-500">Nombre</p>
              {isUpdating ? <input placeholder='Modificando...' type="text" className="text-lg font-medium text-gray-800"/>  : <p className="text-lg font-medium text-gray-800">{user?.name}</p>}
            </div>
            <button className="cursor-pointer" onClick={()=>{isUpdating? setIsUpdating(false) : setIsUpdating(true)}}>
              <MdModeEdit />
            </button>
          </div>

          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="text-lg font-medium text-gray-800">{user?.email}</p>
          </div>

          <div className="pt-4">
            <button className="bg-red-400 px-4 py-2 rounded cursor-pointer hover:bg-red-300 duration-200 font-bold w-full">
              Eliminar Perfil
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default User;
