import { db } from "./db.js";
import { diaryEntries } from "./schema.js";

async function main(): Promise<void> {
    console.log("Sembrando datos iniciales...");

    await db.insert(diaryEntries).values([
        {
            "date": "2017-01-01",
            "weather": "rainy",
            "visibility": "poor",
            "comment": "Pretty scary flight, I'm glad I'm alive",
        },
        {
            "date": "2017-04-01",
            "weather": "sunny",
            "visibility": "good",
            "comment": "Everything went better than expected, I'm learning much",
        },
        {
            "date": "2017-04-15",
            "weather": "windy",
            "visibility": "good",
            "comment": "I'm getting pretty confident although I hit a flock of birds",
        },
        {
            "date": "2017-05-11",
            "weather": "cloudy",
            "visibility": "good",
            "comment": "I almost failed the landing but I survived",
        },
    ]).onConflictDoNothing();

    console.log("Semillas plantadas con éxito");
    process.exit(0);
}

main().catch((err) => {
    console.error("Error al sembrar:", err);
    process.exit(1);
});