import { useState } from "react";

export default function MovieForm({ initial, onSubmit, submitText = "Guardar" }) {
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const errors = {
    title: form.title.trim().length < 2 && "Mínimo 2 caracteres",
    year: !form.year || Number(form.year) < 1900 ? "Año >= 1900" : null,
    genre: !form.genre && "Requerido",
    rating: form.rating === "" || Number(form.rating) < 0 || Number(form.rating) > 10 ? "0 a 10" : null,
    posterUrl: form.posterUrl && !/^https?:\/\//.test(form.posterUrl) ? "URL válida" : null,
  };
  const isInvalid = Object.values(errors).some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalid) return;
    onSubmit({ ...form, year: Number(form.year), rating: Number(form.rating) });
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-3xl">
      <div className="card-body grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Título</label>
          <input className="input w-full" name="title" value={form.title} onChange={onChange} onBlur={onBlur} placeholder="Ej: Inception" />
          {touched.title && errors.title && <p className="help">{errors.title}</p>}
        </div>

        <div>
          <label className="label">Año</label>
          <input className="input w-full" type="number" name="year" value={form.year} onChange={onChange} onBlur={onBlur} placeholder="2010" />
          {touched.year && errors.year && <p className="help">{errors.year}</p>}
        </div>

        <div>
          <label className="label">Género</label>
          <input className="input w-full" name="genre" value={form.genre} onChange={onChange} onBlur={onBlur} placeholder="Sci-Fi" />
          {touched.genre && errors.genre && <p className="help">{errors.genre}</p>}
        </div>

        <div>
          <label className="label">Rating</label>
          <input className="input w-full" type="number" step="0.1" name="rating" value={form.rating} onChange={onChange} onBlur={onBlur} placeholder="8.5" />
          {touched.rating && errors.rating && <p className="help">{errors.rating}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Poster (URL)</label>
          <input className="input w-full" name="posterUrl" value={form.posterUrl} onChange={onChange} onBlur={onBlur} placeholder="https://…" />
          {touched.posterUrl && errors.posterUrl && <p className="help">{errors.posterUrl}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Descripción</label>
          <textarea className="input w-full" name="overview" rows={4} value={form.overview} onChange={onChange} />
        </div>
      </div>

      <div className="px-4 pb-4">
        <button className="btn-primary w-full md:w-auto" disabled={isInvalid}>{submitText}</button>
      </div>
    </form>
  );
}

