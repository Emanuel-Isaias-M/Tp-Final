import { useNavigate, useParams, Link } from "react-router-dom";
import { useMovies } from "../context/MoviesContext.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MovieDetail() {
  const { id } = useParams();
  const { movies, removeMovie } = useMovies();
  const navigate = useNavigate();

  const movie = movies.find(m => m.id === id);
  if (!movie) return <p>No existe la película.</p>;

  const onDelete = async () => {
    const ok = await Swal.fire({
      title: "¿Eliminar?",
      text: `Se eliminará "${movie.title}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (ok.isConfirmed) {
      await removeMovie(movie.id);
      toast.success("Eliminado correctamente");
      navigate("/items");
    }
  };

  return (
    <section className="grid lg:grid-cols-2 gap-6 items-start">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-[28rem] object-cover rounded-2xl border" />
      <div>
        <h1>{movie.title}</h1>
        <p className="mt-1 text-gray-600">{movie.genre} • {movie.year} • ⭐ {movie.rating}</p>
        <p className="mt-4 text-gray-800">{movie.overview}</p>

        <div className="mt-6 flex gap-2">
          <Link className="btn-warning" to={`/items/${movie.id}/edit`}>Editar</Link>
          <button className="btn-danger" onClick={onDelete}>Eliminar</button>
          <Link className="btn-secondary" to="/items">Volver</Link>
        </div>
      </div>
    </section>
  );
}

