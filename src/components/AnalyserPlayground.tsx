import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ANALYSIS_MODE, FFT_SIZE_OPTIONS } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";

const AnalyserPlayground = () => {
  function handleSubmit() {}
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold tracking-tight">
        Analyser Settings
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Analysis Mode</label>
            <Select items={ANALYSIS_MODE}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose analysis mode</SelectLabel>
                  {ANALYSIS_MODE.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium mb-3">FFT Size</label>
            <Select items={FFT_SIZE_OPTIONS}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose FFT size</SelectLabel>
                  {FFT_SIZE_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Smoothing Time Constant
            </label>
            <Slider
              defaultValue={[0.5]}
              max={1}
              step={0.1}
              className="w-full mt-3"
            />
          </div>
        </div>
        <Button
          className={"w-full bg-cyan-500 hover:bg-cyan-900 mt-4"}
          type="submit"
        >
          Apply
        </Button>
      </form>
    </div>
  );
};

export default AnalyserPlayground;
