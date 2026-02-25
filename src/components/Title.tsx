import type { TitleProps } from "../Types"

function Title({text}: TitleProps) {
  return (
    <h2 className=" text-3xl font-black text-center my-5">
      {text}
    </h2>
  )
}

export default Title
