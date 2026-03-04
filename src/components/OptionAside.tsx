import type { OptionAsideProps } from "../Types";

function OptionAside({
  ReactIcon,
  text,
  showTextOnMobile = true, // por defecto mostrar texto en móvil
}: OptionAsideProps & { showTextOnMobile?: boolean }) {
  return (
    <div className="flex h-10 items-center gap-2 px-2 cursor-pointer hover:bg-white hover:text-black duration-200 w-full min-w-0 ">
      {ReactIcon}
      <p
        className={`${showTextOnMobile ? "inline" : "hidden"} md:inline text-center flex flex-1`}
      >
        {text}
      </p>
    </div>
  );
}

export default OptionAside;
//FAL TA RESPONSIVE DE TODAS LAS PAGINAS
