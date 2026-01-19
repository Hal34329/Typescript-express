import type { DiaryEntry } from "../types.js";
import diaryData from "./diaries.json" with { type: "json" };

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

export const getEntries = () => diaries;

export const addEntry = () => null;