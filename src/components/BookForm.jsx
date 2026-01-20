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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

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

  const required = [
    "title",
    "author",
    "genres",
    "publicationYear",
    "pageCount",
    "status",
  ];

  const isFormValid = required.every((key) => {
    const v = formData[key];
    return String(v ?? "").trim() !== "";
  });

  const setField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "status" && value !== "read" ? { dateFinished: "" } : {}),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setField(id, type === "checkbox" ? checked : value);
  };

  // Submit (go home)
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      navigate("/home");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // Submit (stay on form)
  const handleSubmitAndAddAgain = async (e) => {
    e.preventDefault();

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

      // reset form & stay on form
      setFormData({ ...INITIAL_STATE });
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
              <label htmlFor="title" className="text-white">
                Title
              </label>
              <Input
                id="title"
                type="text"
                className="bg-white text-black"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>

            {/* Series */}
            <div>
              <label htmlFor="series" className="text-white">
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

                <Select
                  value={formData.seriesNum ?? ""}
                  onValueChange={(value) => setField("seriesNum", value)}
                >
                  <SelectTrigger className="bg-stone-100 text-black">
                    <SelectValue placeholder="#" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={String(i)}
                          className="text-black"
                        >
                          {i}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Author(s) */}
            <div className="md:col-span-2">
              <label htmlFor="author" className="text-white">
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
            <div className="flex md:inline-flex gap-4">
              <div>
                <label htmlFor="isbn10" className="text-white">
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
                <label htmlFor="isbn13" className="text-white">
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
                <label htmlFor="asin" className="text-white">
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
            </div>

            {/* Genres */}
            <div className="md:col-span-2">
              <label htmlFor="genres" className="text-white">
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
              <label htmlFor="publicationYear" className="text-white">
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
              <label htmlFor="pageCount" className="text-white">
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

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* Format */}
              <FieldSet className="text-white">
                <FieldLegend variant="label" className="text-white">
                  Format
                </FieldLegend>

                <RadioGroup
                  className="mt-2 flex flex-wrap items-center gap-6"
                  value={formData.format}
                  onValueChange={(val) => setField("format", val)}
                >
                  {["physical", "ebook", "library"].map((opt) => (
                    <Field
                      key={opt}
                      orientation="horizontal"
                      className="items-center gap-2"
                    >
                      <RadioGroupItem
                        value={opt}
                        id={`format-${opt}`}
                        className="border-white/70 text-white data-[state=checked]:border-white data-[state=checked]:text-white"
                      />
                      <FieldLabel
                        htmlFor={`format-${opt}`}
                        className="text-white"
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>

              {/* Status */}
              <FieldSet className="text-white">
                <FieldLegend variant="label" className="text-white">
                  Status
                </FieldLegend>

                <RadioGroup
                  className="mt-2 flex flex-wrap items-center gap-6"
                  value={formData.status}
                  onValueChange={(val) => setField("status", val)}
                >
                  {["read", "want", "currentlyReading", "owned"].map((opt) => (
                    <Field
                      key={opt}
                      orientation="horizontal"
                      className="items-center gap-2"
                    >
                      <RadioGroupItem
                        value={opt}
                        id={`status-${opt}`}
                        className="border-white/70 text-white data-[state=checked]:border-white data-[state=checked]:text-white"
                      />
                      <FieldLabel
                        htmlFor={`status-${opt}`}
                        className="text-white"
                      >
                        {opt === "currentlyReading"
                          ? "Currently Reading"
                          : opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            </div>

            <FieldGroup className="grid grid-cols-2 gap-6 text-white">
              <Field orientation="horizontal" className="items-center gap-2">
                <Checkbox
                  id="kindleUnlimited"
                  checked={formData.kindleUnlimited}
                  onCheckedChange={(checked) =>
                    setField("kindleUnlimited", !!checked)
                  }
                  className="border-white/70 data-[state=checked]:bg-white data-[state=checked]:text-[#5a2530]"
                />
                <FieldLabel htmlFor="kindleUnlimited" className="text-white">
                  Kindle Unlimited
                </FieldLabel>
              </Field>

              <Field orientation="horizontal" className="items-center gap-2">
                <Checkbox
                  id="libby"
                  checked={formData.libby}
                  onCheckedChange={(checked) => setField("libby", !!checked)}
                  className="border-white/70 data-[state=checked]:bg-white data-[state=checked]:text-[#5a2530]"
                />
                <FieldLabel htmlFor="libby" className="text-white">
                  Libby
                </FieldLabel>
              </Field>
            </FieldGroup>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="text-white">
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
              <label htmlFor="dateAdded" className="text-white">
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
              <label htmlFor="dateFinished" className="text-white">
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
              className="border-2 border-red-600 p-2 px-4 font-bold bg-stone-50/50 text-red-900 rounded"
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
