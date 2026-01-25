import type { DiaryEntry, NonSensitiveInfoDiaryEntry } from "../types.js";
import diaryData from "./diaries.json" with { type: "json" };

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

export const getEntries = (): DiaryEntry[] => diaries;

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    // return entry;
    if(entry) {
        const { comment, ...restOfDiary } = entry;
        return restOfDiary;
    }
    return undefined;
};

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility,
        };
    });
};

export const addEntry = (): undefined => undefined;