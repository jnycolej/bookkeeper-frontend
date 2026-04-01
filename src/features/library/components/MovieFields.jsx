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
        <label htmlFor="title" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Title
        </label>
        <Input
          id="title"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>

      {/* Series */}
      <div>
        <label htmlFor="series" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Series
        </label>

        <div className="grid grid-cols-[1fr_80px] gap-2">
          <Input
            id="series"
            type="text"
            className="bg-stone-50/50 !text-base rounded-full text-stone-950"
            value={formData.series}
            onChange={handleChange}
            placeholder="(optional)"
          />

          <Select
            value={formData.seriesNum ?? ""}
            onValueChange={(value) => setField("seriesNum", value)}
          >
            <SelectTrigger className="bg-stone-50/50 rounded-full text-stone-950">
              <SelectValue placeholder="#" />
            </SelectTrigger>
            <SelectContent className="bg-stone-50/90">
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
        <label htmlFor="director" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Director(s)
        </label>
        <Input
          id="director"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.director}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Screenwriter(s) */}
      <div className="">
        <label htmlFor="screenwriter" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Screenwriter(s)
        </label>
        <Input
          id="screenwriter"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.screenwriter}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Story By */}
      <div className="">
        <label htmlFor="storyBy" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Story By
        </label>
        <Input
          id="storyBy"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.storyBy}
          onChange={handleChange}
          placeholder="story by; ..."
        />
      </div>

      {/* Producer(s) */}
      <div className="">
        <label htmlFor="producers" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Producer(s)
        </label>
        <Input
          id="producers"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.producers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Cinematography */}
      <div className="">
        <label htmlFor="cinematography" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Cinematography
        </label>
        <Input
          id="cinematography"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.cinematography}
          onChange={handleChange}
          placeholder="cinematographer ..."
        />
      </div>

      <div className="">
        <label htmlFor="country" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Country
        </label>
        <Input
          id="country"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.country}
          onChange={handleChange}
          placeholder="country 1; country 2; ..."
        />
      </div>
      {/* Actor(s) */}
      <div className="md:col-span-2">
        <label htmlFor="actors" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Actor(s)
        </label>
        <Input
          id="actors"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.actors}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Genres */}
      <div className="md:col-span-2">
        <label htmlFor="genres" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Genre(s)
        </label>
        <Input
          id="genres"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.genres}
          onChange={handleChange}
          placeholder="Genre1; Genre2; ..."
          required
        />
      </div>
      {/* Music By */}
      <div>
        <label htmlFor="musicBy" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Music By
        </label>
        <Input
          id="musicBy"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.musicBy}
          onChange={handleChange}
          placeholder="Music By ..."
        />
      </div>
      {/* Production Company */}
      <div>
        <label htmlFor="productionCompany" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Production Company
        </label>
        <Input
          id="productionCompany"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.productionCompany}
          onChange={handleChange}
          placeholder="Production Company 1; Production Company 2 ..."
        />
      </div>

      {/* Studio */}
      <div>
        <label htmlFor="studio" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Studio
        </label>
        <Input
          id="studio"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.studio}
          onChange={handleChange}
          placeholder="Studio ..."
        />
      </div>

      {/* Year */}
      <div>
        <label htmlFor="publicationYear" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Release Year
        </label>
        <Input
          id="releaseYear"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="pageCount" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Duration (min)
        </label>
        <Input
          id="duration"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>

      {/* Format + Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="text-stone-50 bg-red-500/10 rounded-lg pb-2 px-2">
          <FieldLegend variant="label" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
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
                <FieldLabel htmlFor={`format-${opt}`} className="!text-lg text-shadow-lg/30 !tracking-wide text-stone-50">
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>

        <FieldSet className="text-stone-50 bg-red-500/10 rounded-lg pb-2 px-2">
          <FieldLegend variant="label" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
            Status
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap items-center gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["watched", "wantToWatch", "rewatching"].map((opt) => (
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
                <FieldLabel htmlFor={`status-${opt}`} className="!text-lg text-shadow-lg/30 !tracking-wide text-stone-50">
                  {opt === "wantToWatch"
                    ? "Want to Watch"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      </div>

      {/* Rewatching Count */}
      <div>
        <label htmlFor="rewatchCount" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Rewatch Count
        </label>
        <Input
          id="rewatchCount"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.rewatchCount}
          onChange={handleChange}
          
        />
      </div>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Rating
        </label>
        <Input
          id="rating"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.rating}
          onChange={handleChange}
          placeholder="1–5 (optional)"
        />
      </div>

      {/* Date Added */}
      <div>
        <label htmlFor="dateAdded" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Date Added
        </label>
        <Input
          id="dateAdded"
          type="date"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.dateAdded}
          onChange={handleChange}
        />
      </div>

      {/* Date Finished (only if Read) */}
      {formData.status === "watched" && (
        <div className="md:col-span-2">
          <label htmlFor="dateFinished" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
            Date Finished
          </label>
          <Input
            id="dateFinished"
            type="date"
            className="bg-stone-50/50 !text-base rounded-full text-stone-950"
            value={formData.dateFinished}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};
