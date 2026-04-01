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

export const TVShowFields = ({ formData, handleChange, setField }) => {
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

      {/* Creator */}
      <div>
        <label htmlFor="creator" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Creator(s)
        </label>

        <div className="">
          <Input
            id="creator"
            type="text"
            className="bg-stone-50/50 !text-base rounded-full text-stone-950"
            value={formData.creator}
            onChange={handleChange}
            placeholder="Show creator..."
            required
          />
        </div>
      </div>

      {/* showRunner(s) */}
      <div className="">
        <label htmlFor="showRunner" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Show Runner(s)
        </label>
        <Input
          id="showRunner"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.showRunner}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Executive Producers */}
      <div className="">
        <label htmlFor="execProducers" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Executive Producer(s)
        </label>
        <Input
          id="execProducers"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.execProducers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Producers*/}
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
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Camera Setup */}
      <div className="">
        <label htmlFor="cameraSetup" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Camera Setup(s)
        </label>
        <Input
          id="cameraSetup"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.cameraSetup}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Writer(s) */}
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

      {/* Network/Studio */}
      <div className="">
        <label htmlFor="network" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Network/Studio
        </label>
        <Input
          id="network"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.network}
          onChange={handleChange}
          placeholder="Network/Studio..."
        />
      </div>
      {/* Production Companies */}
      <div className="">
        <label htmlFor="productionCompanies" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Production Company
        </label>
        <Input
          id="productionCompanies"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.productionCompanies}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Actor(s) */}
      <div className="">
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
      {/* Music By */}
      <div className="">
        <label htmlFor="musicBy" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
         Music By
        </label>
        <Input
          id="musicBy"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.musicBy}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Genres */}
      <div className="">
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

      {/* Language */}
      <div className="">
        <label htmlFor="language" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Language
        </label>
        <Input
          id="language"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.language}
          onChange={handleChange}
        />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Country
        </label>
        <Input
          id="country"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      {/* Still Running */}
      <div>
        <label htmlFor="stillRunning" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Still Running
        </label>
        <Checkbox
          id="stillRunning"
          checked={!!formData.stillRunning}
          onCheckedChange={(checked) => setField("stillRunning", checked)}
          className="bg-stone-100"
        />
      </div>
      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Show Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      {/* End Date*/}
      <div>
        <label htmlFor="endDate" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Show End Date
        </label>
        <Input
          id="endDate"
          type="date"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      {/* Seasons */}
      <div>
        <label htmlFor="seasons" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Seasons
        </label>
        <Input
          id="seasons"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.seasons}
          onChange={handleChange}
        />
      </div>
      {/* Episodes */}
      <div>
        <label htmlFor="episodes" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Episodes
        </label>
        <Input
          id="episodes"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.episodes}
          onChange={handleChange}
        />
      </div>

      {/* Average Episode Runtime */}
      <div>
        <label htmlFor="avgRuntime" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Average Episode Runtime
        </label>
        <Input
          id="avgRuntime"
          type="number"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.avgRuntime}
          onChange={handleChange}
        />
      </div>
      {/* Based On */}
      <div>
        <label htmlFor="basedOn" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          Based On
        </label>
        <Input
          id="basedOn"
          type="text"
          className="bg-stone-50/50 !text-base rounded-full text-stone-950"
          value={formData.basedOn}
          onChange={handleChange}
          placeholder="Based On"
        />
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
          <FieldLegend variant="label" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
            Status
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap h-20 overflow-auto bg-red-950/70 rounded p-2 items-center gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["watched", "watching", "wantToWatch", "rewatching"].map((opt) => (
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
                <FieldLabel htmlFor={`status-${opt}`} className="!text-base text-shadow-lg/30 !tracking-wide text-stone-50">
                  {opt === "wantToWatch"
                    ? "Want to Watch"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      </div>

            {/* Rewatch Count */}
      <div>
        <label htmlFor="rereadCount" className="!text-2xl text-shadow-lg/30 !tracking-wide text-stone-50">
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
      {/* Date Started Watching */}
      <div>
        <label htmlFor="dateStarted" className="test-stone-200">
          Date Started Watching
        </label>
        <Input
          id="dateStarted"
          type="date"
          className=" bg-stone-100 text-black"
          value={formData.dateStarted}
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
