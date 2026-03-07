import { useEffect, useState } from "react";
import Title from "../components/Title";
import { toast } from "sonner";
import axios from "axios";
import { getUserFromToken } from "../utils/getUserFromToken";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";

function User() {
  const URLBACKEND = import.meta.env.VITE_BACKEND_URL;
  const user = getUserFromToken();

  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [showDeleteInput, setShowDeleteInput] = useState(false);

  async function handleDelete() {
    if (password === "") {
      toast.error("Debes ingresar tu contraseña");
      return;
    }

    try {
      await axios.delete(`${URLBACKEND}api/users/me`, {
        data: { password },
      });

      toast.success("Cuenta eliminada correctamente");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      toast.error("Contraseña incorrecta o error del servidor");
    }
  }

  async function handleUpdate() {
    if (name === "") {
      toast("Hay campos vacíos");
      return;
    }

    try {
      const response = await axios.put(
        `${URLBACKEND}api/users/${user?.id}`,
        { name }
      );

      toast.success("Nombre actualizado con éxito");
      setIsUpdating(false);
      setUserData(response.data);
    } catch (e) {
      toast.error("Ha ocurrido un error. Inténtalo más tarde");
    }
  }

  async function getUserData() {
    try {
      const response = await axios.get(
        `${URLBACKEND}api/users/${user?.id}`
      );
      setUserData(response.data);
    } catch (error: any) {
      toast.error("Ha ocurrido un error. Inténtalo más tarde.");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 w-full h-full max-md:h-screen max-md:-mt-30">
      <Title text={"Usuario"} />

      <section
        className={`mt-8 w-full max-w-md ${
          isUpdating ? "bg-blue-100/90" : "bg-white/90"
        } rounded shadow-lg p-6 sm:p-8 border border-gray-200 transition duration-200`}
      >
        <div className="flex flex-col gap-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Nombre</p>

              {isUpdating ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="text-lg font-medium text-gray-800 bg-white rounded pl-1 w-full"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800 wrap-break">
                  {userData?.name}
                </p>
              )}
            </div>

            <div className="flex gap-3 self-end sm:self-auto">
              {!isUpdating && (
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setName(userData?.name || "");
                    setIsUpdating(true);
                  }}
                >
                  <MdModeEdit  className="max-md:text-4xl"/>
                </button>
              )}

              {isUpdating && (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={handleUpdate}
                  >
                    <FaSave className="max-md:text-4xl" />
                  </button>

                  <button
                    className="cursor-pointer"
                    onClick={() => setIsUpdating(false)}
                  >
                    <TbArrowBackUp className="max-md:text-4xl"/>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="text-lg font-medium text-gray-800 wrap-break">
              {user?.email}
            </p>
          </div>

          {/* DELETE */}
          <div className="pt-4 flex flex-col gap-3">
            {showDeleteInput && (
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            )}

            <button
              onClick={() => {
                if (!showDeleteInput) {
                  setShowDeleteInput(true);
                } else {
                  handleDelete();
                }
              }}
              className="bg-red-400 px-4 py-2 rounded cursor-pointer hover:bg-red-300 duration-200 font-bold w-full"
            >
              {showDeleteInput
                ? "Confirmar Eliminación"
                : "Eliminar Perfil"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default User;