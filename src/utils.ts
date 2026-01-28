import { newDiarySchema, type NewDiaryEntry } from "@types";

const toNewDiaryEntry = (diary: unknown): NewDiaryEntry => {
    return newDiarySchema.parse(diary);
};

export default toNewDiaryEntry;