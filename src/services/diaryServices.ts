import type { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from "@types";
// import diaryData from "./diaries.json" with { type: "json" };
import { db } from "../db/db.js";
import { diaryEntries } from "../db/schema.js";
import { eq } from "drizzle-orm";

// const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

// export const getEntries = (): DiaryEntry[] => diaries;
export const getEntries = async (): Promise<DiaryEntry[]> => {
    return await db.select({ 
        id: diaryEntries.id, 
        date: diaryEntries.date, 
        weather: diaryEntries.weather, 
        visibility: diaryEntries.visibility, 
        comment: diaryEntries.comment, 
    }).from(diaryEntries);
};
    
// export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
//     const entry = diaries.find(d => d.id === id);
//     if(entry) {
//         const { comment, ...restOfDiary } = entry;
//         return restOfDiary;
//     }
//     return undefined;
// };

export const findById = async (id: number): Promise<NonSensitiveInfoDiaryEntry | undefined> => {
    const [entry] = await db.select({
        id: diaryEntries.id,
        date: diaryEntries.date,
        weather: diaryEntries.weather,
        visibility: diaryEntries.visibility,
    }).from(diaryEntries).where(eq(diaryEntries.id, id)).limit(1);

    return entry;
};

// export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
//     return diaries.map(({ id, date, weather, visibility }) => {
//         return {
//             id,
//             date,
//             weather,
//             visibility,
//         };
//     });
// };

export const getEntriesWithoutSensitiveInfo = async (): Promise<NonSensitiveInfoDiaryEntry[]> => {
    return await db.select({
        id: diaryEntries.id,
        date: diaryEntries.date,
        weather: diaryEntries.weather,
        visibility: diaryEntries.visibility,
    }).from(diaryEntries);
};

// export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
//     const newDiary = {
//         id: Math.max(...diaries.map(d => d.id)) + 1,
//         ...newDiaryEntry,
//     };

//     diaries.push(newDiary);
//     return newDiary;
// };

export const addDiary = async (newDiaryEntry: NewDiaryEntry): Promise<DiaryEntry> => {
    // return await db.insert(diaryEntries).values([
    //     // ID generado por Postgres
    //     entry,
    // ]);
    const [newEntry] = await db.insert(diaryEntries).values(newDiaryEntry).returning();

    return newEntry!;
};