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

    if (content == "" || title == "") {
      toast.error("Existen campos vacios");
      return;
    }

    try {
      await axios.post(`${URLBACKEND}api/notes`, {
        title: title,
        content: content,
      });

      toast("Nota creada con éxito");
      setContent("");
      setTitle("");
    } catch (error) {
      toast.error("Ha ocurrido un error, intenta más tarde");
    }
  }

  return (
  <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 overflow-x-hidden">
    <div className="w-full max-w-2xl">
      <Title text="Crear una nota" />

      <form
        onSubmit={submitNote}
        className="mt-6 space-y-6 p-6 rounded-xl shadow-xl border border-gray-200 
                   bg-gray-100/90 w-full"
      >
        {/* Título */}
        <div className="flex flex-col gap-2">
          <label htmlFor="titlenote" className="font-bold">
            Título:
          </label>
          <input
            type="text"
            id="titlenote"
            className="w-full px-3 py-2 rounded border bg-white 
                       focus:outline-none focus:ring-2 focus:ring-green-500  border-gray-200"
            placeholder="Ideas para mi proyecto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contentnote" className="font-bold">
            Contenido:
          </label>
          <textarea
            value={content}
            id="contentnote"
            rows={6}
            className="w-full px-3 py-2 rounded border border-gray-200 bg-white resize-none
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingresa aqui tus ideas"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full md:w-auto bg-green-500 px-6 py-3 rounded-lg 
                     font-bold hover:bg-green-400 transition duration-200 cursor-pointer"
        >
          Crear Nota
        </button>
      </form>
    </div>
  </div>
);
}

export default CreateNote;
