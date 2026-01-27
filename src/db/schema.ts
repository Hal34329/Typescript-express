// import { pgTable, serial, date, varchar, text } from "drizzle-orm/pg-core";
// export const diaryEntries = pgTable("diary_entries", {
//     // serial() crea un auto-incremental (1, 2, 3...) como en nuestro ejercicio
//     id: serial("id").primaryKey(),

//     // date() guarda la fecha. mode: 'string' para que sea fácil de manejar
//     date: date("date").notNull(),

//     // varchar() con límite de 20 caracteres
//     weather: varchar("weather", { length: 20 }).notNull(),

//     // visibility también con límite
//     visibility: varchar("visibility", { length: 20 }).notNull(),

//     // text() para comentarios largos sin límite
//     comment: text("comment"),
// });

import { pgTable, serial, date, varchar, text } from "drizzle-orm/pg-core";

export const diaryEntries = pgTable("diary_entries", {
    id: serial("id").primaryKey(),
    date: date("date", { mode: "string" }).notNull(),
    weather: varchar("weather", { length: 10 }).notNull(),
    visibility: varchar("visibility", { length:10 }).notNull(),
    comment: text("comment"),
});
