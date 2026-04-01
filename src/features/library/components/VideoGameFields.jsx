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
            <SelectContent className="bg-stone-50/90 overflow-auto h-60">
              <SelectGroup>
                {[...Array(16)].map((_, i) => (
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
        <label htmlFor="developer" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Developer(s)
        </label>
        <Input
          id="developer"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.developer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Publisher */}
      <div className="">
        <label htmlFor="publisher" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Publisher(s)
        </label>
        <Input
          id="publisher"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/*  Designer */}
      <div className="">
        <label htmlFor="designer" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Designer(s)
        </label>
        <Input
          id="designer"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.designer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Programmers */}
      <div className="">
        <label htmlFor="programmers" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Programmer(s)
        </label>
        <Input
          id="programmers"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.programmers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/*  Artist */}
      <div className="">
        <label htmlFor="artist" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Artist(s)
        </label>
        <Input
          id="artist"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Writers */}
      <div className="">
        <label htmlFor="writers" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Writer(s)
        </label>
        <Input
          id="writers"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.writers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Composer */}
      <div className="">
        <label htmlFor="composer" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Composer(s)
        </label>
        <Input
          id="composer"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.composer}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Engine */}
      <div className="">
        <label htmlFor="engine" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Engine
        </label>
        <Input
          id="engine"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.engine}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Platforms */}
      <div className="md:col-span-2">
        <label htmlFor="platforms" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Platform(s)
        </label>
        <Input
          id="platforms"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.platforms}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
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

      {/*  Country */}
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
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/*  Mode */}
      <div className="">
        <label htmlFor="mode" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Mode(s)
        </label>
        <Input
          id="mode"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.mode}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Release Year */}
      <div>
        <label htmlFor="releaseYear" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
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
        <label htmlFor="duration" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Duration (hrs)
        </label>
        <Input
          id="duration"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      {/* Format + Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="text-stone-50 bg-red-500/10 rounded-lg pb-2 px-2">
          <FieldLegend variant="label" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
            Format
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap items-center h-20 overflow-auto gap-6"
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
            className="mt-2 flex flex-wrap items-center h-20 overflow-auto gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["completed", "playing", "wantToPlay", "replaying"].map((opt) => (
              <Field
                key={opt}
                orientation="horizontal"
                className="items-center gap-2"
              >
                <RadioGroupItem
                  className="bg-stone-50"
                  value={opt}
                  id={`status-${opt}`}
                />
                <FieldLabel htmlFor={`status-${opt}`} className="!text-lg text-shadow-lg/30 !tracking-wide text-stone-50">
                  {opt === "wantToPlay"
                    ? "Want to Play"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      </div>

            {/* Replaying Count */}
      <div>
        <label htmlFor="replayCount" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Replay Count
        </label>
        <Input
          id="replayCount"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.replayCount}
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

      {/* Start Date */}
      {/* <div>
        <label htmlFor="startDate" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.dateStarted}
          onChange={handleChange}
          required
        />
      </div> */}

      {/* Date Finished (only if completed) */}
      {formData.status === "completed" && (
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
