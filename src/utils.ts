import { newDiarySchema, type NewDiaryEntry } from "./types.js";

const toNewDiaryEntry = (diary: unknown): NewDiaryEntry => {
    return newDiarySchema.parse(diary);
};

export default toNewDiaryEntry;