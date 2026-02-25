import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const URLBACKEND = import.meta.env.VITE_BACKEND_URL;
function Register() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function registerUser(e: any) {
    e.preventDefault();

    if(email == "" || password == "" || nombre == "" || secondPass == ""){
      toast.error("Existen campos vacios")
      return
    }

     if(!email.includes("@")){
      toast.error("El correo no es válido")
      return;
    }
    

    if(password.length<8){
      toast.error("La contraseña debe tener minimo 8 caracteres")
      return
    }

    if(password != secondPass){
      toast.error("Las contraseñas no coinciden")
      return
    }
    
   
    try {
      const response = await axios.post(`${URLBACKEND}api/users`, {
        name: nombre,
        email: email,
        password: password,
      });
      toast.success("Se ha registrado con éxito");
      console.log(response.data);

      setEmail("")
      setSecondPass("")
      setPassword("")
      setNombre("")

      navigate('/')
    } catch (e) {
      console.log(e);
      toast.error("Ha ocurrido un error");
    }
  }

  return (
    <div
      className="flex flex-col   items-center 
     overflow-hidden  "
    >
      <h1 className="text-4xl font-bold mb-10 text-white">Registrar Usuario</h1>

      <form className=" flex flex-col gap-4 " onSubmit={registerUser}>
        {/* EMAIL */}
        <div className="flex w-full flex-col">
          <label className="text-white font-bold" htmlFor="emailtxt">
            Email:{" "}
          </label>
          <input
            type="text"
            name="email"
            id="emailtxt"
            value={email}
            className="rounded  border border-blue-300 bg-blue-300 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1   text-blue-900"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/* NOMBRE */}
        <div className="flex w-full flex-col">
          <label className="text-white font-bold" htmlFor="nametxt">
            Nombre:{" "}
          </label>
          <input
            type="text"
            name="name"
            id="nametxt"
            value={nombre}
            className="rounded  border border-blue-300 bg-blue-300 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1   text-blue-900"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        {/* CONTRASEÑA */}
        <div className="flex flex-col">
          <label htmlFor="passwordtxt" className="text-white font-bold">
            Contraseña:{" "}
          </label>
          <input
            type="password"
            name="password"
            id="passwordtxt"
            value={password}
            className="rounded  border border-blue-300 bg-blue-300 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1 text-blue-800"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/* REPETIR CONTRASEÑA */}
        <div className="flex flex-col">
          <label htmlFor="passwordtxt2" className="text-white font-bold">
            Repetir contraseña:{" "}
          </label>
          <input
            type="password"
            name="password2"
            value={secondPass}
            id="passwordtxt2"
            className="rounded  border border-blue-300 bg-blue-300 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1 text-blue-800"
            onChange={(e) => {
              setSecondPass(e.target.value);
            }}
          />
        </div>

        <button className="w-full flex  bg-green-400 items-center hover:bg-green-300 duration-200 rounded ">
          {loading ? <input
            type="submit"
            value="Cargando..."
            className=" w-full hover:cursor-pointer font-bold text-blue-500-900 p-1"
          /> : <input
            type="submit"
            value="Registrar"
            className=" w-full hover:cursor-pointer font-bold text-green-900 p-1"
          />}
        </button>

        <Link to={"/"}>
          <button className="w-full flex  bg-yellow-400 items-center hover:bg-yellow-300 duration-200 rounded ">
            <input
              type="button"
              value="Iniciar Sesion"
              className=" w-full hover:cursor-pointer font-bold text-yellow-900 p-1"
            />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
