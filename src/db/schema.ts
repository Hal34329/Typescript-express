import { pgTable, serial, date, text, pgEnum } from "drizzle-orm/pg-core";
import { WeatherValues, VisibilityValues } from "@types";

export const weatherEnum = pgEnum("weather", WeatherValues);
export const visibilityEnum = pgEnum("visibility", VisibilityValues);

export const diaryEntries = pgTable("diary_entries", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "string" }).notNull(),
    weather: weatherEnum("weather").notNull(),
    visibility: visibilityEnum("visibility").notNull(),
    comment: text("comment").notNull(),
});
