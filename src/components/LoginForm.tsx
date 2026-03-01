import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
//variable de entorno
const URLBACKEND = import.meta.env.VITE_BACKEND_URL;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function login(e: any) {
    e.preventDefault();

    if(email == "" || password == ""){
      toast.error("Existen campos vacios")
      return
    }

    if(!email.includes("@")){
      toast.error("El correo no es válido")
      return;
    }

    if(password.length<8){
      toast.error("La contraseña debe tener minimo 8 caracteres")
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${URLBACKEND}api/auth/login`,
        {
          email: email,
          password: password,
        },
       
      );
      localStorage.setItem("token",response.data.token)
      console.log(response.data)

      setEmail("")
      setPassword("")

      navigate("/dashboard")
    } catch (error: any) {
      if(error.response.status === 401){
        console.log(error.response.status)
        toast.error("Credenciales incorrectas")
        return
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col   items-center 
     overflow-hidden  "
    >
      <h1 className="text-4xl font-bold mb-10 text-white">Iniciar Sesion</h1>
    
      <form className=" flex flex-col gap-4 " onSubmit={login}>
        <div className="flex w-full flex-col">
          <label className="text-white " htmlFor="emailtxt">
            Email:{" "}
          </label>
          <input
            type="text"
            name="email"
            id="emailtxt"
            value={email}
            className="rounded  border border-blue-300 bg-black-50 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1   text-gray-100"

            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordtxt" className="text-white ">
            Contraseña:{" "}
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="passwordtxt"
            className="rounded  border border-blue-300 bg-black-300 focus:border-green-400 focus:outline focus:outline-transparent duration-200 p-1 text-gray-100"

            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>

        <button className="w-full flex  bg-blue-400 items-center hover:bg-blue-300 duration-200 rounded ">
          {/* <input
            type="submit"
            value="Ingresar"
            className=" w-full hover:cursor-pointer  text-green-900 p-1"
          /> */}
          {loading ? <input
            type="submit"
            value="Cargando..."
            className=" w-full hover:cursor-pointer  text-black-500-900 p-1"
          /> : <input
            type="submit"
            value="ingresar"
            className=" w-full hover:cursor-pointer  text-black-900 p-1"
          />}
        </button>

        <Link to={"register"}>
          <button className="w-full flex  bg-yellow-400 items-center hover:bg-yellow-300 duration-200 rounded ">
            <input
              type="button"
              value="Registrar"
              className=" w-full hover:cursor-pointer  text-black p-1"
            />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
