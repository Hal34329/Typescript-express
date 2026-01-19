import type { DiaryEntry, NonSensitiveInfoDiaryEntry } from "../types.js";
import diaryData from "./diaries.json" with { type: "json" };

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

export const getEntries = (): DiaryEntry[] => diaries;

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => diaries;

export const addEntry = (): undefined => undefined;