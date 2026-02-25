import { GiNotebook } from "react-icons/gi";
import { getUserFromToken } from "../utils/getUserFromToken";

function Dashboard() {
  const user = getUserFromToken()
  return (
    <div className=" p-4 flex flex-col items-center justify-center gap-3 w-full h-full">
      <h1 className="text-5xl font-bold mb-4">
        Bienvenido {user?.name}
      </h1>

      <p className="text-4xl">
        Creado con REACT JS, AXIOS, MYSQL, JAVA SPRING BOOT, JWT
      </p>

      <GiNotebook size={300} />
    </div>
  );
}

export default Dashboard;
