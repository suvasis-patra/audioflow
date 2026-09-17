export const FFT_SIZE_OPTIONS = [
  { label: "Select FFT window Size", value: null },
  { label: "256", value: 256 },
  { label: "512", value: 512 },
  { label: "1024", value: 1024 },
  { label: "2048", value: 2048 },
  { label: "4096", value: 4096 },
] as const;

export const ANALYSIS_MODE = [
  { label: "Select analysis mode", value: null },
  { label: "Time Domain", value: "time-domain" },
  { label: "Frequency Domain", value: "frequency-domain" },
] as const;
