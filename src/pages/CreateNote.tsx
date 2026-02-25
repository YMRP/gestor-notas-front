import Title from "../components/Title";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function CreateNote() {
  const URLBACKEND = import.meta.env.VITE_BACKEND_URL;

  //Loading

  //formulario
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

 

  async function submitNote(e: any) {
    e.preventDefault();


    if(content == "" || title == ""){
        toast.error("Existen campos vacios")
        return
    }

    

    try {

       await axios.post(`${URLBACKEND}api/notes`, {
        title: title,
        content: content,
      });


      toast("Nota creada con éxito")
      setContent("")
      setTitle("")
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error, intenta más tarde");
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col ">
      <Title text="Crear una nota" />

      <form
        className="mt-6 space-y-4  p-6 rounded shadow-xl border border-gray-200 flex flex-col "
        onSubmit={submitNote}
      >
        <div className="flex gap-4 flex-col  ">
          <label htmlFor="titlenote" className="font-bold">
            Título:
          </label>
          <input
            type="text"
            id="titlenote"
            className=" px-2 py-1 rounded border w-full border-gray-300 duration-200 focus:outline focus:border-green-400 focus:outline-green-600"
            placeholder="Ideas para mi proyecto"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-4  flex-col">
          <label htmlFor="contentnote" className="font-bold ">
            Contenido:
          </label>
          <textarea
            name="content"
            id="contentnote"
            className=" px-2 py-1 rounded border w-full border-gray-300 duration-200 focus:outline focus:border-green-400 focus:outline-green-600"
            placeholder="Ingresa aqui tus ideas"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button className="bg-green-400 px-4 py-2 rounded cursor-pointer hover:bg-green-300 duration-200 font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
