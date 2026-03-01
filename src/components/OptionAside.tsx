import type { OptionAsideProps } from "../Types";

function OptionAside({ ReactIcon, text }: OptionAsideProps) {
  return (
    <div className="flex h-10 items-center gap-1 px-2 cursor-pointer hover:bg-white hover:text-black  duration-200  ">
      {ReactIcon}
      <p className="text-center">{text}</p>
    </div>
  );
}

export default OptionAside;
