import type { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from "@types";
import { db } from "../db/db.js";
import { diaryEntries } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getEntries = async (): Promise<DiaryEntry[]> => {
    return await db.select({ 
        id: diaryEntries.id, 
        date: diaryEntries.date, 
        weather: diaryEntries.weather, 
        visibility: diaryEntries.visibility, 
        comment: diaryEntries.comment, 
    }).from(diaryEntries);
};

export const findById = async (id: number): Promise<NonSensitiveInfoDiaryEntry | undefined> => {
    const [entry] = await db.select({
        id: diaryEntries.id,
        date: diaryEntries.date,
        weather: diaryEntries.weather,
        visibility: diaryEntries.visibility,
    }).from(diaryEntries).where(eq(diaryEntries.id, id)).limit(1);

    return entry;
};

export const getEntriesWithoutSensitiveInfo = async (): Promise<NonSensitiveInfoDiaryEntry[]> => {
    return await db.select({
        id: diaryEntries.id,
        date: diaryEntries.date,
        weather: diaryEntries.weather,
        visibility: diaryEntries.visibility,
    }).from(diaryEntries);
};

export const addDiary = async (newDiaryEntry: NewDiaryEntry): Promise<DiaryEntry> => {
    const [newEntry] = await db.insert(diaryEntries)
        .values(newDiaryEntry)
        .returning();

    return newEntry!;
};

// Nuevos servicios
export const deleteEntry = async (id: number): Promise<boolean> => {
    const result = await db.delete(diaryEntries)
        .where(eq(diaryEntries.id, id))
        .returning();
    return result.length > 0;
};

export const updateEntry = async (id: number, fields: Partial<DiaryEntry>): Promise<DiaryEntry | undefined> => {
    if(fields.comment) {
        const [current] = await db.select({ c:diaryEntries.comment }).from(diaryEntries).where(eq(diaryEntries.id, id));
        if(current){
            fields.comment = `${current.c} | Update: ${fields.comment}`;
        }
    }

    const [updated] = await db.update(diaryEntries)
        .set(fields)
        .where(eq(diaryEntries.id, id))
        .returning();
    return updated;
};