// src/components/TemperatureChart/types.ts

export interface TemperatureReading {
  'Температура в топке': number;
  'Температура в камере смешения': number;
  'Температура уходящих газов': number;
}

export interface TemperatureData {
  lastUpdated: string;
  temperatures: TemperatureReading;
}
