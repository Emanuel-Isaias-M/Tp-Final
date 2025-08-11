import { useMovies } from "../context/MoviesContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function MovieList() {
  const { movies, loading, error } = useMovies();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!movies.length) return <p>No hay películas aún.</p>;

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </section>
  );
}


