export const WeatherValues = ["sunny", "rainy", "cloudy", "windy", "stormy"] as const;
export type Weather = typeof WeatherValues[number];

export const VisibilityValues = ["great", "good", "ok", "poor"] as const;
export type Visibility = typeof VisibilityValues[number];

export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = Omit<DiaryEntry, "id">;