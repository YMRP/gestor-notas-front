import type { OptionAsideProps } from "../Types";

function OptionAside({ ReactIcon, text }: OptionAsideProps) {
  return (
    <div className="flex  items-center gap-1 px-2 hover:cursor-pointer hover:scale-105 duration-200 ">
      {ReactIcon}
      <p className="text-center">{text}</p>
    </div>
  );
}

export default OptionAside;
