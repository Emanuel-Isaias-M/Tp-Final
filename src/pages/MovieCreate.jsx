import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext.jsx";
import MovieForm from "../components/MovieForm.jsx";
import { toast } from "react-toastify";

// Form inicial para creación
const initial = { title: "", year: "", genre: "", rating: "", posterUrl: "", overview: "" };

export default function MovieCreate() {
  const { createMovie } = useMovies();
  const navigate = useNavigate();

  const onSubmit = async (payload) => {
    await createMovie(payload);
    toast.success("Creado con éxito");
    navigate("/items");
  };

  return <MovieForm initial={initial} onSubmit={onSubmit} submitText="Crear" />;
}

