import { Link } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <MoviesProvider>
      {/* Fondo global + alto mínimo de pantalla */}
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="container flex items-center justify-between py-3">
            <Link to="/items" className="text-xl font-semibold text-brand-700">🎬 Nodo Cine</Link>
            <nav className="flex gap-2">
              <Link to="/items" className="btn-secondary">Listado</Link>
              <Link to="/items/create" className="btn-primary">Crear</Link>
            </nav>
          </div>
        </header>

        <main className="container py-6">
          <AppRouter />
        </main>

        <ToastContainer position="top-right" autoClose={1800} />
      </div>
    </MoviesProvider>
  );
}
