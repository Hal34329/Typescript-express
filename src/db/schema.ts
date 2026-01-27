import { pgTable, serial, date, varchar, text } from "drizzle-orm/pg-core";

export const diaryEntries = pgTable("diary_entries", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "string" }).notNull(),
    weather: varchar("weather", { length: 10 }).notNull(),
    visibility: varchar("visibility", { length:10 }).notNull(),
    comment: text("comment"),
});
