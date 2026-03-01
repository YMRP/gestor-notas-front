import { getUserFromToken } from "../utils/getUserFromToken";
function Dashboard() {
  const user = getUserFromToken();
  console.log(user)
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
     

      {/* Content */}
      
      <div className="relative p-4 flex flex-col items-center justify-center gap-6 min-h-screen text-center text-black">
        <h1 className="text-5xl font-bold">
          ¡Hola, {user?.name}!
        </h1>

        <p className="text-2xl">Gestiona todas tus notas personales a tu gusto con las siguientes acciones:</p>

        <div className="flex w-full items-center justify-center gap-5  font-bold ">
          <button className="bg-amber-400 p-6 text-amber-900 ">Agregar</button>
          <button className="bg-red-400 p-6 text-red-900">Modificar</button>
          <button className="bg-blue-400 p-6 text-blue-900">Consultar</button>
          <button className="bg-green-400 p-6 text-green-900">Eliminar</button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;