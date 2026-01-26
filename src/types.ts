import { z } from "zod";

export const WeatherValues = ["sunny", "rainy", "cloudy", "windy", "stormy"] as const;
export const VisibilityValues = ["great", "good", "ok", "poor"] as const;

export const diarySchema = z.object({
    id: z.number(),
    date: z.iso.date(),
    weather: z.enum(WeatherValues),
    visibility: z.enum(VisibilityValues),
    comment: z.string(),
});

export const newDiarySchema = diarySchema.omit({ id: true });
export const NonSensitiveInfoDiaryEntrySchema = diarySchema.omit({ comment: true });

export type DiaryEntry = z.infer<typeof diarySchema >;
export type NonSensitiveInfoDiaryEntry = z.infer<typeof NonSensitiveInfoDiaryEntrySchema>;
export type NewDiaryEntry = z.infer<typeof newDiarySchema>;