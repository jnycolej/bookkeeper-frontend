import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { addBook } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookForm() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const INITIAL_STATE = {
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
  };

  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  const [isFormValid, setIsFormValid] = useState(false);

  // 1) Validation always returns true/false
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

  // 2) Handlers
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const upd = { ...formData, [id]: val };
    setFormData(upd);
    validateForm(upd);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    const upd = {
      ...formData,
      [name]: value,
      ...(name === "status" && value !== "read" ? { dateFinished: "" } : {}),
    };

    setFormData(upd);
    validateForm(upd);
  };

  // 3) Submit with blank→null normalization
  const handleSubmit = async (e) => {
    e.preventDefault();

    // turn semicolon-lists into arrays
    const authors = formData.author
      .split(";")
      .map((a) => a.trim())
      .filter(Boolean);

    const genres = formData.genres
      .split(";")
      .map((g) => g.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      series: formData.series.trim() || null,
      seriesNum:
        formData.seriesNum === "" || formData.seriesNum == null
          ? null
          : Number(formData.seriesNum),
      author: authors,
      genres: genres,
      publicationYear: Number(formData.publicationYear),
      pageCount: Number(formData.pageCount),
      status: formData.status,
      format: formData.format || null,
      isbn10: formData.isbn10.trim() || null,
      isbn13: formData.isbn13.trim() || null,
      asin: formData.asin.trim() || null,
      kindleUnlimited: formData.kindleUnlimited,
      libby: formData.libby,
      rating: formData.rating ? Number(formData.rating) : null,
      ...(formData.dateAdded
        ? { dateAdded: new Date(formData.dateAdded) }
        : {}),
      ...(formData.status === "read" && formData.dateFinished
        ? { dateFinished: new Date(formData.dateFinished) }
        : { dateFinished: null }),
    };

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "read:books write:books",
        },
        prompt: "consent",
      });
      await addBook(payload, token);

      // reset form & go home
      setFormData({ ...INITIAL_STATE });
      setIsFormValid(false);
      navigate("/home");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // 3) Submit with blank→null normalization
  const handleSubmitAndAddAgain = async (e) => {
    e.preventDefault();

    // turn semicolon-lists into arrays
    const authors = formData.author.split(";").map((a) => a.trim());
    const genres = formData.genres.split(";").map((g) => g.trim());

    const payload = {
      title: formData.title,
      series: formData.series.trim() || null,
      seriesNum:
        formData.seriesNum === "" || formData.seriesNum == null
          ? null
          : Number(formData.seriesNum),
      author: authors,
      genres: genres,
      publicationYear: Number(formData.publicationYear),
      pageCount: Number(formData.pageCount),
      status: formData.status,
      format: formData.format || null,
      isbn10: formData.isbn10.trim() || null,
      isbn13: formData.isbn13.trim() || null,
      asin: formData.asin.trim() || null,
      rating: formData.rating ? Number(formData.rating) : null,
      kindleUnlimited: formData.kindleUnlimited,
      libby: formData.libby,
      ...(formData.dateAdded
        ? { dateAdded: new Date(formData.dateAdded) }
        : {}),
      ...(formData.status === "read" && formData.dateFinished
        ? { dateFinished: new Date(formData.dateFinished) }
        : { dateFinished: null }),
    };

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "read:books write:books",
        },
        prompt: "consent",
      });
      await addBook(payload, token);

      // reset form & go home
      setFormData({ ...INITIAL_STATE });
      setIsFormValid(false);
      navigate("/bookform");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
          Add New Book
        </h1>

        <form onSubmit={handleSubmit} className="bk-form p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Title */}
            <div>
              <label htmlFor="title" className="bk-label text-white">
                Title
              </label>
              <Input
                id="title"
                type="text"
                className="bg-white text-black"
                value={formData.title}
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
                <Input
                  id="series"
                  type="text"
                  className="bg-white text-black"
                  value={formData.series}
                  onChange={handleChange}
                  placeholder="(optional)"
                />
                <select
                  id="seriesNum"
                  className="bk-select"
                  value={formData.seriesNum || ""}
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
            <div className="md:col-span-2">
              <label htmlFor="author" className="bk-label text-white">
                Author(s)
              </label>
              <Input
                id="author"
                type="text"
                className="bg-white text-black"
                value={formData.author}
                onChange={handleChange}
                placeholder="Name1; Name2; ..."
                required
              />
            </div>

            {/* ISBNs */}
            <div>
              <label htmlFor="isbn10" className="bk-label text-white">
                ISBN-10
              </label>
              <Input
                id="isbn10"
                type="text"
                className="bg-white text-black"
                value={formData.isbn10}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            <div>
              <label htmlFor="isbn13" className="bk-label text-white">
                ISBN-13
              </label>
              <Input
                id="isbn13"
                type="text"
                className="bg-white text-black"
                value={formData.isbn13}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            <div>
              <label htmlFor="asin" className="bk-label text-white">
                ASIN
              </label>
              <Input
                id="asin"
                type="text"
                className="bg-white text-black"
                value={formData.asin}
                onChange={handleChange}
                placeholder="(optional)"
              />
            </div>

            {/* Genres */}
            <div className="md:col-span-2">
              <label htmlFor="genres" className="bk-label text-white">
                Genre(s)
              </label>
              <Input
                id="genres"
                type="text"
                className="bg-white text-black"
                value={formData.genres}
                onChange={handleChange}
                placeholder="Genre1; Genre2; ..."
                required
              />
            </div>

            {/* Year & Pages */}
            <div>
              <label htmlFor="publicationYear" className="bk-label text-white">
                Publication Year
              </label>
              <Input
                id="publicationYear"
                type="number"
                className="bg-white text-black"
                value={formData.publicationYear}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="pageCount" className="bk-label text-white">
                Page Count
              </label>
              <Input
                id="pageCount"
                type="number"
                className="bg-white text-black"
                value={formData.pageCount}
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
                      checked={formData.format === opt}
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
                      checked={formData.status === opt}
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
                checked={formData.kindleUnlimited}
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
                checked={formData.libby}
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
              <Input
                id="rating"
                type="number"
                className="bg-white text-black"
                value={formData.rating}
                onChange={handleChange}
                placeholder="1–5 (optional)"
              />
            </div>

            {/* Date Added */}
            <div>
              <label htmlFor="dateAdded" className="bk-label text-white">
                Date Added
              </label>
              <Input
                id="dateAdded"
                type="date"
                className="bg-white text-black text-dark"
                value={formData.dateAdded}
                onChange={handleChange}
              />
            </div>
          </div>
            {/* Date Finished (only if Read) */}
            {formData.status === "read" && (
              <div>
                <label htmlFor="dateFinished" className="bk-label text-white">
                  Date Finished
                </label>
                <Input
                  id="dateFinished"
                  type="date"
                  className="bg-white text-black"
                  value={formData.dateFinished}
                  onChange={handleChange}
                />
              </div>
            )}
          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-red-900 p-3 m-1 font-medium rounded"
              disabled={!isFormValid}
            >
              Add Book
            </button>
            <button
              type="button"
              className="bg-red-900/40 p-3 m-1 font-medium rounded"
              disabled={!isFormValid}
              onClick={handleSubmitAndAddAgain}
            >
              Add & Add Another
            </button>
            <button
              type="button"
              className="border-2 border-red-600 p-2 px-4 font-semibold bg-stone-50/50 text-red-600 rounded"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
