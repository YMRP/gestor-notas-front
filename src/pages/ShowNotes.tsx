import { useEffect, useState } from "react";
import Title from "../components/Title";
import { toast } from "sonner";
import axios from "axios";
import type { NoteProps } from "../Types";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

function ShowNotes() {
  const BACKENDURL = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<null | number>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  async function modNote(id: number) {
    if (editTitle === "" || editContent === "") {
      toast("Existen campos vacios");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(`${BACKENDURL}api/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });
      console.log(response);
      toast.success("Nota actualizada correctamente.");
      setIsUpdating(null);
      fecthNotes();
    } catch (error: any) {
      toast.error("Ha ocurrido un error. Intenta de nuevo más tarde");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: number) {
    const confirmDelete = window.confirm("¿Deseas eliminar esta nota?");

    if (confirmDelete) {
      try {
        await axios.delete(`${BACKENDURL}api/notes/${id}`);
        toast("Nota eliminada con éxito");
        //"Devuélveme todas las notas cuyo id sea diferente al id que quiero eliminar"
        setNotes((prev) => prev.filter((note) => note.id !== id));
        setIsUpdating(null);
      } catch (error: any) {
        toast.error("Ha ocurrido un error. Intenta de nuevo más tarde");
        console.log(error);
      }
    }
  }

  async function fecthNotes() {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKENDURL}api/notes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setNotes(response.data);
      console.log("Datos de notas: ", response.data);
    } catch (error: any) {
      toast.error("Ocurrió un error, inténtalo de nuevo más tarde");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthNotes();
  }, []);

  return (
    <div className="p-4 flex flex-col  items-center w-full">
         <Title text="Mis Notas" />

      {loading ? (
        <div className="text-center mt-8">Cargando notas...</div>
      ) : notes.length === 0 ? (
        <div className="text-center  text-gray-500 flex flex-col justify-center gap-5 h-fit">
          No hay ninguna nota
          <div className="flex items-center justify-center gap-5 text-white font-light p-3 rounded-2xl bg-green-500 w-fit text-3xl hover:scale-105 duration-200">
            <Link to={"/create-note"}>
              <button className="cursor-pointer ">
                Haz tu primer aporte aqui
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-10 flex  flex-col items-center  ">
          {notes.map((note) => (
            <div
              key={note.id}
              className={
                isUpdating === note.id
                  ? "p-3 border bg-blue-100 border-gray-200  rounded shadow-lg transition w-2xl "
                  : "p-3 border bg-gray-100 border-gray-200  rounded shadow-lg transition w-2xl "
              }
            >
              {/* TITLE*/}

              {isUpdating === note.id ? (
                <input
                  className="font-semibold mb-2 w-full pl-1"
                  placeholder={note.title}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                  }}
                ></input>
              ) : (
                <p className="font-semibold mb-2 w-full">{note.title}</p>
              )}
              {/* FINISH TITLE*/}

              {/* //CONTENT  */}
              {isUpdating === note.id ? (
                <textarea
                  className="text-gray-600 text-sm  rounded p-2 max-w-xs min-h-25 max-h-50 overflow-y-auto whitespace-pre-wrap wrap-break-word min-w-full bg-white"
                  placeholder={note.content}
                  onChange={(e) => {
                    setEditContent(e.target.value);
                  }}
                ></textarea>
              ) : (
                <p className="text-gray-600 text-sm  rounded p-2 max-w-xs min-h-25 max-h-50 overflow-y-auto whitespace-pre-wrap wrap-break-word min-w-full bg-white">
                  {note.content}
                </p>
              )}
              {/* FINISH CONTENT */}

              <div className="flex items-center justify-between my-2 mx-6  ">
                <p className="text-gray-500  mt-1 text">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
                <div className=" flex gap-5 mt-1">
                  <button className="cursor-pointer text-red-500 hover:scale-120 duration-200">
                    <MdDelete
                      size={20}
                      onClick={() => {
                        deleteNote(note.id);
                      }}
                    />
                  </button>

                  {isUpdating === note.id ? (
                    <>
                      <button className="cursor-pointer text-blue-700 hover:scale-120 duration-200">
                        <FaSave
                          size={20}
                          onClick={() => {
                            modNote(note.id);
                          }}
                        />
                      </button>
                      <button className="cursor-pointer text-green-700 hover:scale-120 duration-200">
                        <TbArrowBackUp
                          size={20}
                          onClick={() => {
                            setIsUpdating(null);
                            console.log("Finalizando modificacion");
                          }}
                        />
                      </button>
                    </>
                  ) : (
                    <button className="cursor-pointer text-blue-700 hover:scale-120 duration-200">
                      <MdModeEdit
                        size={20}
                        onClick={() => {
                          setIsUpdating(note.id);
                          setEditContent(note.content);
                          setEditTitle(note.title);
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowNotes;
