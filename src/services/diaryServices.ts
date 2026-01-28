import type { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from "@types";
// import diaryData from "./diaries.json" with { type: "json" };
import { db } from "../db/db.js";
import { diaryEntries } from "../db/schema.js";

// const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

// export const getEntries = (): DiaryEntry[] => diaries;
export const getEntries = async (): Promise<DiaryEntry[]> => {
    const rows = await db.select({ 
        id: diaryEntries.id, 
        date: diaryEntries.date, 
        weather: diaryEntries.weather, 
        visibility: diaryEntries.visibility, 
        comment: diaryEntries.comment, 
    }).from(diaryEntries);

    return rows as DiaryEntry[];
};
    
// export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
//     const entry = diaries.find(d => d.id === id);
//     if(entry) {
//         const { comment, ...restOfDiary } = entry;
//         return restOfDiary;
//     }
//     return undefined;
// };

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

// export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
//     const newDiary = {
//         id: Math.max(...diaries.map(d => d.id)) + 1,
//         ...newDiaryEntry,
//     };

//     diaries.push(newDiary);
//     return newDiary;
// };