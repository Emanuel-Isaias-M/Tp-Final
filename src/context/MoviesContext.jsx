import { createContext, useContext, useEffect, useReducer } from "react";
import { api } from "../api/axios";

const MoviesContext = createContext();
const initialState = { movies: [], loading: false, error: null };

// Manejo el estado de forma predecible
function reducer(state, action) {
  switch (action.type) {
    case "LOADING": return { ...state, loading: true, error: null };
    case "ERROR":   return { ...state, loading: false, error: action.payload };
    case "SET":     return { movies: action.payload, loading: false, error: null };
    case "ADD":     return { ...state, movies: [action.payload, ...state.movies], loading: false };
    case "UPDATE":  return { ...state, movies: state.movies.map(m => m.id === action.payload.id ? action.payload : m), loading: false };
    case "REMOVE":  return { ...state, movies: state.movies.filter(m => m.id !== action.payload), loading: false };
    default: return state;
  }
}

export function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // GET /movies
  const fetchMovies = async () => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await api.get("/movies");
      dispatch({ type: "SET", payload: data });
    } catch (e) { dispatch({ type: "ERROR", payload: e.message }); }
  };

  // POST /movies
  const createMovie = async (payload) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await api.post("/movies", payload);
      dispatch({ type: "ADD", payload: data });
      return data;
    } catch (e) { dispatch({ type: "ERROR", payload: e.message }); throw e; }
  };

  // PUT /movies/:id
  const updateMovie = async (id, payload) => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await api.put(`/movies/${id}`, payload);
      dispatch({ type: "UPDATE", payload: data });
      return data;
    } catch (e) { dispatch({ type: "ERROR", payload: e.message }); throw e; }
  };

  // DELETE /movies/:id
  const removeMovie = async (id) => {
    try {
      dispatch({ type: "LOADING" });
      await api.delete(`/movies/${id}`);
      dispatch({ type: "REMOVE", payload: id });
    } catch (e) { dispatch({ type: "ERROR", payload: e.message }); throw e; }
  };

  useEffect(() => { fetchMovies(); }, []);

  return (
    <MoviesContext.Provider value={{ ...state, fetchMovies, createMovie, updateMovie, removeMovie }}>
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);

