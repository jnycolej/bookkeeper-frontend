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

      {/* Creator */}
      <div>
        <label htmlFor="creator" className="text-white">
          Creator(s)
        </label>

        <div className="">
          <Input
            id="creator"
            type="text"
            className="bg-white text-black"
            value={formData.creator}
            onChange={handleChange}
            placeholder="Show creator..."
            required
          />
        </div>
      </div>

      {/* showRunner(s) */}
      <div className="">
        <label htmlFor="showRunner" className="text-white">
          Show Runner(s)
        </label>
        <Input
          id="showRunner"
          type="text"
          className="bg-white text-black"
          value={formData.showRunner}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>

      {/* Executive Producers */}
      <div className="">
        <label htmlFor="execProducers" className="text-white">
          Executive Producer(s)
        </label>
        <Input
          id="execProducers"
          type="text"
          className="bg-white text-black"
          value={formData.execProducers}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Producers*/}
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
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Camera Setup */}
      <div className="">
        <label htmlFor="cameraSetup" className="text-white">
          Camera Setup(s)
        </label>
        <Input
          id="cameraSetup"
          type="text"
          className="bg-white text-black"
          value={formData.cameraSetup}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Writer(s) */}
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

      {/* Network/Studio */}
      <div className="">
        <label htmlFor="network" className="text-white">
          Network/Studio
        </label>
        <Input
          id="network"
          type="text"
          className="bg-white text-black"
          value={formData.network}
          onChange={handleChange}
          placeholder="Network/Studio..."
        />
      </div>
      {/* Production Companies */}
      <div className="">
        <label htmlFor="productionCompanies" className="text-white">
          Production Company
        </label>
        <Input
          id="productionCompanies"
          type="text"
          className="bg-white text-black"
          value={formData.productionCompanies}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Actor(s) */}
      <div className="">
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
      {/* Music By */}
      <div className="">
        <label htmlFor="musicBy" className="text-white">
         Music By
        </label>
        <Input
          id="musicBy"
          type="text"
          className="bg-white text-black"
          value={formData.musicBy}
          onChange={handleChange}
          placeholder="Name1; Name2; ..."
        />
      </div>
      {/* Genres */}
      <div className="">
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

      {/* Language */}
      <div className="">
        <label htmlFor="language" className="text-white">
          Language
        </label>
        <Input
          id="language"
          type="text"
          className="bg-white text-black"
          value={formData.language}
          onChange={handleChange}
        />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="text-white">
          Country
        </label>
        <Input
          id="country"
          type="text"
          className="bg-white text-black"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      {/* Still Running */}
      <div>
        <label htmlFor="stillRunning" className="text-white">
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
        <label htmlFor="startDate" className="text-white">
          Show Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="bg-white text-black"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      {/* End Date*/}
      <div>
        <label htmlFor="endDate" className="text-white">
          Show End Date
        </label>
        <Input
          id="endDate"
          type="date"
          className="bg-white text-black"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      {/* Seasons */}
      <div>
        <label htmlFor="seasons" className="text-white">
          Seasons
        </label>
        <Input
          id="seasons"
          type="number"
          className="bg-white text-black"
          value={formData.seasons}
          onChange={handleChange}
        />
      </div>
      {/* Episodes */}
      <div>
        <label htmlFor="episodes" className="text-white">
          Episodes
        </label>
        <Input
          id="episodes"
          type="number"
          className="bg-white text-black"
          value={formData.episodes}
          onChange={handleChange}
        />
      </div>

      {/* Average Episode Runtime */}
      <div>
        <label htmlFor="avgRuntime" className="text-white">
          Average Episode Runtime
        </label>
        <Input
          id="avgRuntime"
          type="number"
          className="bg-white text-black"
          value={formData.avgRuntime}
          onChange={handleChange}
        />
      </div>
      {/* Based On */}
      <div>
        <label htmlFor="basedOn" className="text-white">
          Based On
        </label>
        <Input
          id="basedOn"
          type="text"
          className="bg-white text-black"
          value={formData.basedOn}
          onChange={handleChange}
          placeholder="Based On"
        />
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:col-span-2">
        <FieldSet className="text-white">
          <FieldLegend variant="label" className="text-white">
            Status
          </FieldLegend>

          <RadioGroup
            className="mt-2 flex flex-wrap items-center gap-6"
            value={formData.status}
            onValueChange={(val) => setField("status", val)}
          >
            {["watched", "watching", "wantToWatch"].map((opt) => (
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
