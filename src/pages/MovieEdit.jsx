import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovies } from "../context/MoviesContext.jsx";
import MovieForm from "../components/MovieForm.jsx";
import { toast } from "react-toastify";

// Edición de una película existente
export default function MovieEdit() {
  const { id } = useParams();
  const { movies, updateMovie } = useMovies();
  const navigate = useNavigate();

  const current = movies.find(m => m.id === id);
  const [form, setForm] = useState(current || null);

  // Si entro directo por URL, espero a que el contexto cargue
  useEffect(() => { if (!form && current) setForm(current); }, [current, form]);

  if (!current) return <p>No existe la película.</p>;
  if (!form) return <p>Cargando...</p>;

  const onSubmit = async (payload) => {
    await updateMovie(id, payload);
    toast.success("Actualizado");
    navigate(`/items/${id}`);
  };

  return <MovieForm initial={form} onSubmit={onSubmit} submitText="Guardar cambios" />;
}
