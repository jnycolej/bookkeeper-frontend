import { Input } from "@/components/ui/input";
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

export const MovieFields = ({ formData, handleChange, setField }) => {
  return (
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
          value={formData.title ?? ""}
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
                  <SelectItem key={i} value={String(i)} className="text-black">
                    {i}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Director(s) */}
      <div className="">
        <label htmlFor="director" className="text-white">
          Director(s)
        </label>
        <Input
          id="director"
          type="text"
          className="bg-white text-black"
          value={formData.director}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Screenwriter(s) */}
      <div className="">
        <label htmlFor="screenwriter" className="text-white">
          Screenwriter(s)
        </label>
        <Input
          id="screenwriter"
          type="text"
          className="bg-white text-black"
          value={formData.screenwriter}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Story By */}
      <div className="">
        <label htmlFor="storyBy" className="text-white">
          Story By
        </label>
        <Input
          id="storyBy"
          type="text"
          className="bg-white text-black"
          value={formData.storyBy}
          onChange={handleChange}
          placeholder="story by; ..."
        />
      </div>

      {/* Producer(s) */}
            <div className="">
        <label htmlFor="producers" className="text-white">
          Producer(s)
        </label>
        <Input
          id="producers"
          type="text"
          className="bg-white text-black"
          value={formData.producers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Cinematography */}
      <div className="">
        <label htmlFor="cinematography" className="text-white">
           Cinematography
        </label>
        <Input
          id="cinematography"
          type="text"
          className="bg-white text-black"
          value={formData.cinematography}
          onChange={handleChange}
          placeholder="cinematographer ..."
        />
      </div>

<div className="">
  <label htmlFor="country" className="text-white">
    Country
  </label>
  <Input
    id="country"
    type="text"
    className="bg-white text-black"
    value={formData.country}
    onChange={handleChange}
    placeholder="country 1; country 2; ..."
  />
</div>
      {/* Actor(s) */}
      <div className="md:col-span-2">
        <label htmlFor="actors" className="text-white">
          Actor(s)
        </label>
        <Input
          id="actors"
          type="text"
          className="bg-white text-black"
          value={formData.actors}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
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
      {/* Music By */}
      <div>
        <label htmlFor="musicBy" className="text-white">
          Music By
        </label>
        <Input
          id="musicBy"
          type="text"
          className="bg-white text-black"
          value={formData.musicBy}
          onChange={handleChange}
          placeholder="Music By ..."
        />
      </div>
      {/* Production Company */}
      <div>
        <label htmlFor="productionCompany" className="text-white">
          Production Company
        </label>
        <Input
          id="productionCompany"
          type="text"
          className="bg-white text-black"
          value={formData.productionCompany}
          onChange={handleChange}
          placeholder="Production Company 1; Production Company 2 ..."
        />
      </div>

      {/* Studio */}
      <div>
        <label htmlFor="studio" className="text-white">
          Studio
        </label>
        <Input
          id="studio"
          type="text"
          className="bg-white text-black"
          value={formData.studio}
          onChange={handleChange}
          placeholder="Studio ..."
        />
      </div>

      {/* Year */}
      <div>
        <label htmlFor="publicationYear" className="text-white">
          Release Year
        </label>
        <Input
          id="releaseYear"
          type="number"
          className="bg-white text-black"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="pageCount" className="text-white">
          Duration (min)
        </label>
        <Input
          id="duration"
          type="number"
          className="bg-white text-black"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>

      {/* Format + Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="text-stone-100">
          <FieldLegend variant="label" className="text-white">
            Format
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap items-center gap-6"
            value={formData.format}
            onValueChange={(val) => setField("format", val)}
          >
            {["physical", "streaming", "owned"].map((opt) => (
              <Field
                key={opt}
                orientation="horizontal"
                className="items-center gap-2"
              >
                <RadioGroupItem
                  className="bg-stone-100"
                  value={opt}
                  id={`format-${opt}`}
                />
                <FieldLabel htmlFor={`format-${opt}`} className="text-white">
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>

        <FieldSet className="text-white">
          <FieldLegend variant="label" className="text-white">
            Status
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap items-center gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["watched", "wantToWatch"].map((opt) => (
              <Field
                key={opt}
                orientation="horizontal"
                className="items-center gap-2"
              >
                <RadioGroupItem
                  className="bg-stone-100"
                  value={opt}
                  id={`status-${opt}`}
                />
                <FieldLabel htmlFor={`status-${opt}`} className="text-white">
                  {opt === "wantToWatch"
                    ? "Want to Watch"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      </div>

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
          className="bg-white text-black"
          value={formData.dateAdded}
          onChange={handleChange}
        />
      </div>

      {/* Date Finished (only if Read) */}
      {formData.status === "watched" && (
        <div className="md:col-span-2">
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
    </div>
  );
};
