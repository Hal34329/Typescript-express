// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export const WeatherValues = ["sunny", "rainy", "cloudy", "windy", "stormy"] as const;
export type Weather = typeof WeatherValues[number];
// export type Visibility = "great" | "good" | "ok" | "poor";
export const VisibilityValues = ["great", "good", "ok", "poor"] as const;
export type Visibility = typeof VisibilityValues[number];

// export enum Weather {
//     Sunny = "sunny",
//     Rainy = "rainy",
//     Cloudy = "cloudy",
//     Windy = "windy",
//     Story = "stormy",
// }

// export enum Visibility {
//     Great = "great",
//     Good = "good",
//     Ok = "ok",
//     Poor = "poor",
// }


export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = Omit<DiaryEntry, "id">;