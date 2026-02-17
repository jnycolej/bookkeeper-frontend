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

export const VideoGameFields = ({ formData, handleChange, setField }) => {
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

      {/* Developer(s) */}
      <div className="">
        <label htmlFor="developer" className="text-white">
          Developer(s)
        </label>
        <Input
          id="developer"
          type="text"
          className="bg-white text-black"
          value={formData.developer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Publisher */}
      <div className="">
        <label htmlFor="publisher" className="text-white">
          Publisher(s)
        </label>
        <Input
          id="publisher"
          type="text"
          className="bg-white text-black"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/*  Designer */}
      <div className="">
        <label htmlFor="designer" className="text-white">
          Designer(s)
        </label>
        <Input
          id="designer"
          type="text"
          className="bg-white text-black"
          value={formData.designer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Programmers */}
      <div className="">
        <label htmlFor="programmers" className="text-white">
          Programmer(s)
        </label>
        <Input
          id="programmers"
          type="text"
          className="bg-white text-black"
          value={formData.programmers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Artist */}
      <div className="">
        <label htmlFor="artist" className="text-white">
          Artist(s)
        </label>
        <Input
          id="artist"
          type="text"
          className="bg-white text-black"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Writers */}
      <div className="">
        <label htmlFor="writers" className="text-white">
          Writer(s)
        </label>
        <Input
          id="writers"
          type="text"
          className="bg-white text-black"
          value={formData.writers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Composer */}
      <div className="">
        <label htmlFor="composer" className="text-white">
          Composer(s)
        </label>
        <Input
          id="composer"
          type="text"
          className="bg-white text-black"
          value={formData.composer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Engine */}
      <div className="">
        <label htmlFor="engine" className="text-white">
          Engine
        </label>
        <Input
          id="engine"
          type="text"
          className="bg-white text-black"
          value={formData.engine}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Platforms */}
      <div className="md:col-span-2">
        <label htmlFor="platforms" className="text-white">
          Platform(s)
        </label>
        <Input
          id="platforms"
          type="text"
          className="bg-white text-black"
          value={formData.platforms}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
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

      {/*  Country */}
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
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/*  Mode */}
      <div className="">
        <label htmlFor="mode" className="text-white">
          Mode(s)
        </label>
        <Input
          id="mode"
          type="text"
          className="bg-white text-black"
          value={formData.mode}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Release Year */}
      <div>
        <label htmlFor="releaseYear" className="text-white">
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
        <label htmlFor="duration" className="text-white">
          Duration (hrs)
        </label>
        <Input
          id="duration"
          type="number"
          className="bg-white text-black"
          value={formData.duration}
          onChange={handleChange}
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
            {["physical", "digital", "borrowed"].map((opt) => (
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
            {["completed", "playing", "wantToPlay"].map((opt) => (
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
                  {opt === "wantToPlay"
                    ? "Want to Play"
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

      {/* Start Date */}
      {/* <div>
        <label htmlFor="startDate" className="text-white">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="bg-white text-black"
          value={formData.dateStarted}
          onChange={handleChange}
          required
        />
      </div> */}

      {/* Date Finished (only if completed) */}
      {formData.status === "completed" && (
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
