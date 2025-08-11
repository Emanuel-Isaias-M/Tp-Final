import { Routes, Route, Navigate } from "react-router-dom";
import MovieList from "../pages/MovieList.jsx";
import MovieDetail from "../pages/MovieDetail.jsx";
import MovieCreate from "../pages/MovieCreate.jsx";
import MovieEdit from "../pages/MovieEdit.jsx";
import NotFound from "../pages/NotFound.jsx";

// Defino las rutas del TP5
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/items" replace />} />
      <Route path="/items" element={<MovieList />} />
      <Route path="/items/create" element={<MovieCreate />} />
      <Route path="/items/:id" element={<MovieDetail />} />
      <Route path="/items/:id/edit" element={<MovieEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

