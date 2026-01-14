import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";

export default function EditForm() {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    title: "",
    series: "",
    seriesNum: "",
    author: "",
    genres: "",
    publicationYear: "",
    pageCount: "",
    status: "",
    format: "",
    rating: "",
    dateAdded: "",
    dateFinished: "",
    isbn10: "",
    isbn13: "",
    asin: "",
    kindleUnlimited: false,
    libby: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper to format ISO → YYYY-MM-DD
  const toInputDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toISOString().slice(0, 10);
  };

  // 1) Load existing book & initialize form
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEditData({
          title: data.title,
          series: data.series || "",
          seriesNum: data.seriesNum || "",
          author: (data.author || []).join("; "),
          genres: (data.genres || []).join("; "),
          publicationYear: data.publicationYear || "",
          pageCount: data.pageCount || "",
          status: data.status || "want",
          format: data.format || "",
          rating: data.rating || "",
          isbn10: data.isbn10 || "",
          isbn13: data.isbn13 || "",
          asin: data.asin || "",
          kindleUnlimited: data.kindleUnlimited,
          libby: data.libby,
          dateAdded: toInputDate(data.dateAdded),
          dateFinished: toInputDate(data.dateFinished),
        });

        // Pre-validate so Save is enabled if everything is already present
        validateForm({
          title: data.title,
          author: (data.author || []).join("; "),
          genres: (data.genres || []).join("; "),
          publicationYear: data.publicationYear,
          pageCount: data.pageCount,
          status: data.status,
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getAccessTokenSilently]);

  // 2) Validation: always returns true/false
  const validateForm = (data) => {
    const required = [
      "title",
      "author",
      "genres",
      "publicationYear",
      "pageCount",
      "status",
    ];
    const ok = required.every((key) => {
      const v = data[key];
      return Array.isArray(v) ? v.length > 0 : v !== "";
    });
    setIsFormValid(ok);
  };

  // 3) Handlers
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const upd = { ...editData, [id]: val };
    setEditData(upd);
    validateForm(upd);
  };
  
const handleRadioChange = (e) => {
  const { name, value } = e.target;

  setEditData((prev) => {
    const upd = {
      ...prev,
      [name]: value,
      ...(name === "status" && value !== "read" ? { dateFinished: "" } : {}),
    };
    validateForm(upd);
    return upd;
  });
};



  // 4) Submit: normalize blanks → null
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: editData.title,
      series: editData.series.trim() || null,
      seriesNum: editData.seriesNum || null,
      author: editData.author.split(";").map((a) => a.trim()),
      genres: editData.genres.split(";").map((g) => g.trim()),
      publicationYear: Number(editData.publicationYear),
      pageCount: Number(editData.pageCount),
      status: editData.status,
      format: editData.format || null,
      isbn10: editData.isbn10.trim() || null,
      isbn13: editData.isbn13.trim() || null,
      asin: editData.asin.trim() || null,
      kindleUnlimited: editData.kindleUnlimited,
      libby: editData.libby,
      rating: editData.rating ? Number(editData.rating) : null,
      ...(editData.dateAdded
        ? { dateAdded: new Date(editData.dateAdded) }
        : {}),
      ...(editData.status === "read" && editData.dateFinished
        ? { dateFinished: new Date(editData.dateFinished) }
        : { dateFinished: null }),
    };

    try {
      const token = await getAccessTokenSilently();
      await api.put(`/books/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/books/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update book");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading…</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div>
      <NavBar />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
          Edit Book
        </h1>

        <form onSubmit={handleSubmit} className="bk-form p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Title */}
            <div>
              <label htmlFor="title" className="bk-label text-white">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="bk-input"
                value={editData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Series */}
            <div>
              <label htmlFor="series" className="bk-label text-white">
                Series
              </label>
              <div className="grid grid-cols-[1fr_80px] gap-2">
                <input
                  id="series"
                  type="text"
                  className="bk-input"
                  value={editData.series}
                  onChange={handleChange}
                  placeholder="(optional)"
                />
                <select
                  id="seriesNum"
                  className="bk-select"
                  value={editData.seriesNum || ""}
                  onChange={handleChange}
                  aria-label="Series number"
                >
                  <option value="">#</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author(s) */}
            <div>
              <label htmlFor="author" className="bk-label text-white">
                Author(s)
              </label>
              <input
                id="author"
                type="text"
                className="bk-input"
                value={editData.author}
                onChange={handleChange}
                placeholder="Name1; Name2; ..."
                required
              />
            </div>

            {/* ASIN */}
            <div>
              <label htmlFor="asin" className="bk-label text-white">
                ASIN
              </label>
              <input
                id="asin"
                type="text"
                className="bk-input"
                value={editData.asin}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            {/* ISBNs */}
            <div>
              <label htmlFor="isbn10" className="bk-label text-white">
                ISBN-10
              </label>
              <input
                id="isbn10"
                type="text"
                className="bk-input"
                value={editData.isbn10}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            <div>
              <label htmlFor="isbn13" className="bk-label text-white">
                ISBN-13
              </label>
              <input
                id="isbn13"
                type="text"
                className="bk-input"
                value={editData.isbn13}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            {/* Genres */}
            <div className="md:col-span-2">
              <label htmlFor="genres" className="bk-label text-white">
                Genre(s)
              </label>
              <input
                id="genres"
                type="text"
                className="bk-input"
                value={editData.genres}
                onChange={handleChange}
                placeholder="Genre1; Genre2; ..."
                required
              />
            </div>

            {/* Publication Year & Page Count */}
            <div>
              <label htmlFor="publicationYear" className="bk-label text-white">
                Publication Year
              </label>
              <input
                id="publicationYear"
                type="number"
                className="bk-input"
                value={editData.publicationYear}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="pageCount" className="bk-label text-white">
                Page Count
              </label>
              <input
                id="pageCount"
                type="number"
                className="bk-input"
                value={editData.pageCount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Format */}
            <fieldset className="bk-fieldset">
              <legend className="bk-legend">Format</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {["physical", "ebook", "library"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-light"
                  >
                    <input
                      className="bk-radio"
                      type="radio"
                      id={opt}
                      name="format"
                      value={opt}
                      checked={editData.format === opt}
                      onChange={handleRadioChange}
                    />
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Status */}
            <fieldset className="bk-fieldset">
              <legend className="bk-legend">Status</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {["read", "want", "currentlyReading", "owned"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-light"
                  >
                    <input
                      className="bk-radio"
                      type="radio"
                      id={opt}
                      name="status"
                      value={opt}
                      checked={editData.status === opt}
                      onChange={handleRadioChange}
                    />
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </label>
                ))}
              </div>
            </fieldset>



            {/* Kindle Unlimited */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="kindleUnlimited"
                checked={editData.kindleUnlimited}
                onChange={handleChange}
                className="bk-checkbox"
              />
              <label htmlFor="kindleUnlimited" className="text-light">
                Kindle Unlimited
              </label>
            </div>

            {/* Libby */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="libby"
                checked={editData.libby}
                onChange={handleChange}
                className="bk-checkbox"
              />
              <label htmlFor="libby" className="text-light">
                Libby
              </label>
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="bk-label text-white">
                Rating
              </label>
              <input
                id="rating"
                type="number"
                className="bk-input"
                value={editData.rating}
                onChange={handleChange}
                placeholder="1–5 (optional)"
              />
            </div>

            {/* Date Added */}
            <div>
              <label htmlFor="dateAdded" className="bk-label text-white">
                Date Added
              </label>
              <input
                id="dateAdded"
                type="date"
                className="bk-input"
                value={editData.dateAdded}
                onChange={handleChange}
              />
            </div>
          </div>
            {/* Date Finished (only if Read) */}
            {editData.status === "read" && (
              <div>
                <label htmlFor="dateFinished" className="bk-label text-white">
                  Date Finished
                </label>
                <input
                  id="dateFinished"
                  type="date"
                  className="bk-input"
                  value={editData.dateFinished}
                  onChange={handleChange}
                />
              </div>
            )}
          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="bk-btn-primary"
              disabled={!isFormValid}
            >
              Save Changes
            </button>

            <button
              type="button"
              className="bk-btn-outline"
              onClick={() => navigate(`/books/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
