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

      await axios.put(
        `${BACKENDURL}api/notes/${id}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
        await axios.delete(`${BACKENDURL}api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        toast("Nota eliminada con éxito");

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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotes(response.data);
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
    <div className="p-4 flex flex-col items-center  w-full max-w-6xl mx-auto md:pt-50 max-md:mt-40">
      <Title text="Mis Notas" />

      {loading ? (
        <div className="text-center mt-8">Cargando notas...</div>
      ) : notes.length === 0 ? (
        <div className=" text-center md:h-screen md:-mt-80  text-gray-500 flex flex-col justify-center gap-5 h-fit mt-6 ">
          No hay ninguna nota

          <div className="flex items-center justify-center gap-5  font-bold p-3 rounded-2xl bg-green-500 w-fit text-3xl hover:scale-105 duration-200 text-green-900">
            <Link to={"/create-note"} className="cursor-pointer">
              Haz tu primer aporte aqui
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-10 flex flex-col items-center w-full">
          {notes.map((note) => (
            <div
              key={note.id}
              className={
                isUpdating === note.id
                  ? "p-3 border bg-blue-100/90 border-gray-200 rounded shadow-lg transition w-full max-w-2xl"
                  : "p-3 border bg-gray-100/90 border-gray-200 rounded shadow-lg transition w-full max-w-2xl"
              }
            >
              {/* TITLE */}
              {isUpdating === note.id ? (
                <input
                  className="font-semibold mb-2 w-full pl-1"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <p className="font-semibold mb-2 w-full wrap-break">
                  {note.title}
                </p>
              )}

              {/* CONTENT */}
              {isUpdating === note.id ? (
                <textarea
                  className="text-gray-600 text-sm rounded p-2 w-full min-h-25 max-h-50 overflow-y-auto whitespace-pre-wrap wrap-break bg-white"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                <p className="text-gray-600 text-sm rounded p-2 w-full min-h-25 max-h-50 overflow-y-auto whitespace-pre-wrap wrap-break bg-white">
                  {note.content}
                </p>
              )}

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between my-2 mx-2 sm:mx-6 gap-3">
                <p className="text-gray-500 text-sm">
                  {new Date(note.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-5">
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="cursor-pointer text-red-500 hover:scale-120 duration-200"
                  >
                    <MdDelete size={20} />
                  </button>

                  {isUpdating === note.id ? (
                    <>
                      <button
                        onClick={() => modNote(note.id)}
                        className="cursor-pointer text-blue-700 hover:scale-120 duration-200"
                      >
                        <FaSave size={20} />
                      </button>

                      <button
                        onClick={() => setIsUpdating(null)}
                        className="cursor-pointer text-green-700 hover:scale-120 duration-200"
                      >
                        <TbArrowBackUp size={20} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsUpdating(note.id);
                        setEditContent(note.content);
                        setEditTitle(note.title);
                      }}
                      className="cursor-pointer text-blue-700 hover:scale-120 duration-200"
                    >
                      <MdModeEdit size={20} />
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