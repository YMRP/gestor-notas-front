import Title from "../components/Title";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title text={"Acerca de..."} />

      <p className="text-center bg-transparent border-gray-500 w-2xl h-fit mb-2   "> 
        Este sistema fue creado con el objetivo de centralizar y organizar
        información mediante notas digitales. Permite a los usuarios gestionar
        su contenido de forma intuitiva, manteniendo seguridad y control de
        acceso. Incluye autenticación, autorización y protección de rutas,
        asegurando que cada usuario solo pueda acceder a su información
        correspondiente.
      </p>
      <p>Desarrollado por: Yostin Manuel Ramos Pinto</p>

      <div className=" text-3xl font-black text-center my-5 p-5 flex flex-col items-center justify-center gap-3 ">
        <div className="flex items-center justify-center gap-5">
          <FaJava/>
          <FaReact/>
          <RiTailwindCssFill/>
          <SiMysql/>
          <SiSpringboot/>
          <BiLogoTypescript/>
        </div>
      </div>
    </div>
  );
}

export default About;
