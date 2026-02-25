import { FaReact } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className=" h-fit text-center bg-linear-to-r from-blue-700 to-purple-800 py-2 font-black text-white flex px-2 items-center justify-evenly ">  
      <p>Todos los derechos reservados © Yostin Ramos  </p>
      <div className="flex gap-4 ">
        <FaReact size={30}/>
        <BiLogoSpringBoot size={30}/>
        <SiMysql size={30}/>
        <FaJava size={30}/>
        <RiTailwindCssFill size={30}/>
      </div>
    </footer>
  )
}

export default Footer
