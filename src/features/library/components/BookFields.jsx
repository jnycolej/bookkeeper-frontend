import { Input } from "@/components/ui/input";
// { NumberField } from '@heroui/react';
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

export const BookFields = ({ formData, handleChange, setField }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>

      {/* Series */}
      <div>
        <label
          htmlFor="series"
          className=" !text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
        >
          Series
        </label>

        <div className="grid grid-cols-[1fr_80px] gap-2">
          <Input
            id="series"
            type="text"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.series}
            onChange={handleChange}
            placeholder="(optional)"
          />
          {/* Series Num */}
          <Select
            value={formData.seriesNum ?? ""}
            onValueChange={(value) => setField("seriesNum", value)}
            className="bg-stone-50/50"
          >
            <SelectTrigger className="bg-stone-50/50 rounded-full text-stone-950">
              <SelectValue placeholder="#" />
            </SelectTrigger>
            <SelectContent className="bg-stone-50/90">
              <SelectGroup>
                {[...Array(10)].map((_, i) => (
                  <SelectItem
                    key={i}
                    value={String(i)}
                    className="text-stone-950"
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
      <div className="">
        <label
          htmlFor="author"
          className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
        >
          Author(s)
        </label>
        <Input
          id="author"
          type="text"
          className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
          value={formData.author}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
          required
        />
      </div>

      {/* Genres */}
      <div className="mt-4">
        <label
          htmlFor="genres"
          className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
        >
          Genre(s)
        </label>
        <Input
          id="genres"
          type="text"
          className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
          value={formData.genres}
          onChange={handleChange}
          placeholder="Genre1; Genre2; ..."
          required
        />
      </div>

      {/* ISBNs + ASIN */}
      <div className="flex flex-col md:flex-row md:w-full md:col-span-2 bg-red-950/30 rounded-xl p-4 pb-6 gap-4 m-3">
        {/* isbn10 */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="isbn10"
            className="!text-xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            ISBN-10
          </label>
          <Input
            id="isbn10"
            type="text"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.isbn10 ?? ""}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* isbn13 */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="isbn13"
            className="!text-xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            ISBN-13
          </label>
          <Input
            id="isbn13"
            type="text"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.isbn13 ?? ""}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* asin */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="asin"
            className="!text-xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            ASIN
          </label>
          <Input
            id="asin"
            type="text"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.asin ?? ""}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:w-full md:col-span-2 rounded-xl px-4 pt-3 gap-4 mx-3">
        {/* Publication Year */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="publicationYear"
            className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Publication Year
          </label>
          <Input
            id="publicationYear"
            type="number"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.publicationYear}
            onChange={handleChange}
            required
          />
        </div>

        {/* Page Count */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="pageCount"
            className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Page Count
          </label>
          <Input
            id="pageCount"
            type="number"
            className="bg-stone-50/50 !text-base text-stone-950 rounded-full"
            value={formData.pageCount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reread Count */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="rereadCount"
            className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Reread Count
          </label>
          <Input
            id="rereadCount"
            type="number"
            className="bg-stone-50/50 !text-base rounded-full text-stone-950"
            value={formData.rereadCount}
            onChange={handleChange}
          />
        </div>

        {/* KU + Libby */}
        <div className="flex flex-col flex-1 bg-red-500/10 rounded-full py-2 px-6">
          <p className="!text-2xl text-shadow-lg/30 !tracking-wide pl-5 pt-2 text-stone-50">
            Accessibility
          </p>
          <FieldGroup className="grid grid-cols-2 gap-6 text-stone-50 pt-3 md:col-span-2">
            <Field orientation="horizontal" className="items-center gap-2">
              <Checkbox
                id="kindleUnlimited"
                className="bg-stone-100"
                checked={!!formData.kindleUnlimited}
                onCheckedChange={(checked) =>
                  setField("kindleUnlimited", !!checked)
                }
              />
              <FieldLabel
                htmlFor="kindleUnlimited"
                className="text-stone-50 text-base"
              >
                Kindle Unlimited
              </FieldLabel>
            </Field>

            <Field orientation="horizontal" className="items-center gap-2">
              <Checkbox
                id="libby"
                className="bg-stone-100"
                checked={!!formData.libby}
                onCheckedChange={(checked) => setField("libby", !!checked)}
              />
              <FieldLabel htmlFor="libby" className="text-stone-50 text-base">
                Libby
              </FieldLabel>
            </Field>
          </FieldGroup>
        </div>
      </div>
      {/* Format + Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="text-stone-50 bg-red-500/10 rounded-lg pb-2 px-2">
          <FieldLegend
            variant="label"
            className="!text-xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Format
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap bg-red-950/30 rounded-lg p-2 border border-red-950/60 items-center h-20 overflow-auto gap-6"
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
                  className="bg-stone-100"
                  value={opt}
                  id={`format-${opt}`}
                />
                <FieldLabel
                  htmlFor={`format-${opt}`}
                  className="text-white !text-lg"
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>

        <FieldSet className="text-white bg-red-500/10 rounded-lg pb-2 px-2">
          <FieldLegend
            variant="label"
            className="!text-xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Status
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap bg-red-950/30 rounded-lg p-2 border border-red-950/60 items-center h-20 overflow-auto gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["read", "want", "currentlyReading", "rereading", "owned"].map(
              (opt) => (
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
                  <FieldLabel
                    htmlFor={`status-${opt}`}
                    className="text-white !text-lg"
                  >
                    {opt === "currentlyReading"
                      ? "Currently Reading"
                      : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </FieldLabel>
                </Field>
              ),
            )}
          </RadioGroup>
        </FieldSet>
      </div>

      <div className="flex flex-col md:flex-row md:w-full md:col-span-2 px-4 gap-4 m-3">
        {/* Rating */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="rating"
            className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Rating
          </label>
          <Input
            id="rating"
            type="number"
            className="bg-stone-50/50 !text-base w-full text-stone-950 rounded-full"
            value={formData.rating}
            onChange={handleChange}
            placeholder="1–5"
          />
        </div>

        {/* Date Added */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="dateAdded"
            className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50"
          >
            Date Added
          </label>
          <Input
            id="dateAdded"
            type="date"
            className="bg-stone-50/50 !text-base text-stone-950 w-full rounded-full"
            value={formData.dateAdded}
            onChange={handleChange}
          />
        </div>

        {/* Date Finished (only if Read) */}
        {formData.status === "read" && (
          <div className="flex flex-col flex-1">
            <label
              htmlFor="dateFinished"
              className="!text-2xl text-shadow-lg/30 !tracking-wide  text-stone-50"
            >
              Date Finished
            </label>
            <Input
              id="dateFinished"
              type="date"
              className="bg-stone-50/50 !text-base w-full rounded-full text-stone-950"
              value={formData.dateFinished}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
