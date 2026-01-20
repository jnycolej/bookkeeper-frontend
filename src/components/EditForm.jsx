import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import NavBar from "../components/NavBar";
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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

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

  // const [isFormValid, setIsFormValid] = useState(false);

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
          seriesNum: data.seriesNum == null ? "" : String(data.seriesNum),
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
        // validateForm({
        //   title: data.title,
        //   author: (data.author || []).join("; "),
        //   genres: (data.genres || []).join("; "),
        //   publicationYear: data.publicationYear,
        //   pageCount: data.pageCount,
        //   status: data.status,
        // });
      } catch (e) {
        console.error(e);
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getAccessTokenSilently]);

  // 2) Validation: always returns true/false

  const required = [
    "title",
    "author",
    "genres",
    "publicationYear",
    "pageCount",
    "status",
  ];

  // const validateForm = (data) => {
  //     const ok = required.every((key) => {
  //       const v = data[key];
  //       return Array.isArray(v) ? v.length > 0 : v !== "";
  //     });
  //     setIsFormValid(ok);
  //   };

  const isFormValid = required.every((key) => {
    const v = editData[key];
    return String(v ?? "").trim() !== "";
  });
  // 3) Handlers
  const setField = (key, value) => {
    setEditData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "status" && value !== "read" ? { dateFinished: "" } : {}),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setField(id, type === "checkbox" ? checked : value);
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
    const authors = editData.author
      .split(";")
      .map((a) => a.trim())
      .filter(Boolean);

    const genres = editData.genres
      .split(";")
      .map((g) => g.trim())
      .filter(Boolean);

    e.preventDefault();
    const payload = {
      title: editData.title,
      series: editData.series.trim() || null,
      seriesNum:
        editData.seriesNum === "" || editData.seriesNum == null
          ? null
          : Number(editData.seriesNum),
      authors,
      genres,
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
              <Input
                id="title"
                type="text"
                className="bg-white text-black"
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
                <Input
                  id="series"
                  type="text"
                  className="bg-white text-black"
                  value={editData.series}
                  onChange={handleChange}
                  placeholder="(optional)"
                />
                <Select
                  value={editData.seriesNum ?? ""}
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
            <div>
              <label htmlFor="author" className="bk-label text-white">
                Author(s)
              </label>
              <Input
                id="author"
                type="text"
                className="bg-white text-black"
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
              <Input
                id="asin"
                type="text"
                className="bg-white text-black"
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
              <Input
                id="isbn10"
                type="text"
                className="bg-white text-black"
                value={editData.isbn10}
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
              <Input
                id="genres"
                type="text"
                className="bg-white text-black"
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
              <Input
                id="publicationYear"
                type="number"
                className="bg-white text-black"
                value={editData.publicationYear}
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
                value={editData.pageCount}
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
                  value={editData.format}
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
                  value={editData.status}
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
                  checked={editData.kindleUnlimited}
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
                  checked={editData.libby}
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
              <label htmlFor="rating" className="bk-label text-white">
                Rating
              </label>
              <Input
                id="rating"
                type="number"
                className="bg-white text-black"
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
              <Input
                id="dateAdded"
                type="date"
                className="bg-white text-black text-black"
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
              <Input
                id="dateFinished"
                type="date"
                className="bg-white text-black text-black"
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
              className="border-2 p-2 rounded bg-stone-100 text-red-600"
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
