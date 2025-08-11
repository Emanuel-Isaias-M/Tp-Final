import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <article className="card overflow-hidden group">
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="badge absolute left-3 top-3 bg-white/90">{movie.genre}</span>
      </div>
      <div className="card-body">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">Año {movie.year} • ⭐ {movie.rating}</p>
        <p className="text-sm mt-2 text-gray-700 line-clamp-2">{movie.overview}</p>
        <div className="mt-4 flex gap-2">
          <Link className="btn-secondary" to={`/items/${movie.id}`}>Ver</Link>
          <Link className="btn-warning" to={`/items/${movie.id}/edit`}>Editar</Link>
        </div>
      </div>
    </article>
  );
}

