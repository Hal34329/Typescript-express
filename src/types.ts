// import { z } from "zod";

// export const WeatherValues = ["sunny", "rainy", "cloudy", "windy", "stormy"] as const;
// export const VisibilityValues = ["great", "good", "ok", "poor"] as const;

// export const diarySchema = z.object({
//     id: z.number(),
//     date: z.iso.date(),
//     weather: z.enum(WeatherValues),
//     visibility: z.enum(VisibilityValues),
//     comment: z.string(),
// });

// export const newDiarySchema = diarySchema.omit({ id: true });
// export const partialDiaryEntrySchema = newDiarySchema.partial();
// export const NonSensitiveInfoDiaryEntrySchema = diarySchema.omit({ comment: true });

// export type DiaryEntry = z.infer<typeof diarySchema >;
// export type NonSensitiveInfoDiaryEntry = z.infer<typeof NonSensitiveInfoDiaryEntrySchema>;
// export type NewDiaryEntry = z.infer<typeof newDiarySchema>;

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { diaryEntries } from "./db/schema.js";
import { z } from "zod";

export const WeatherValues = ["sunny", "rainy", "cloudy", "windy", "stormy"] as const;
export const VisibilityValues = ["great", "good", "ok", "poor"] as const;

export const diarySchema = createSelectSchema(diaryEntries, {
    date: z.iso.date(),
});

export const newDiarySchema = createInsertSchema(diaryEntries).omit({ id: true });
export const partialDiaryEntrySchema = newDiarySchema.partial();
export const NonSensitiveInfoDiaryEntrySchema = diarySchema.omit({ comment:true });

export type DiaryEntry = z.infer<typeof diarySchema>;
export type NewDiaryEntry = z.infer<typeof newDiarySchema>;
export type NonSensitiveInfoDiaryEntry = z.infer<typeof NonSensitiveInfoDiaryEntrySchema>;