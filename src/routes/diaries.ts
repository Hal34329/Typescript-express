import express  from "express";
import * as diaryServices from "../services/diaryServices.js";
import toNewDiaryEntry from "../utils.js";

const router = express.Router();

// router.get("/", (_req, res) => {
//     res.send(diaryServices.getEntriesWithoutSensitiveInfo());
// });

router.get("/", async (_req, res) => {
    const entries = await diaryServices.getEntriesWithoutSensitiveInfo();
    res.json(entries);
});

router.get("/full", async (_req, res) => {
    try{
        const entries = await diaryServices.getEntries();
        res.json(entries);
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Unknown Error";
        res.status(500).json({ error: errorMessage });
    }
});

router.get("/:id", async (req, res) => {
    const diary = await diaryServices.findById(Number(req.params.id));
    return (diary!==null) ? res.send(diary) : res.sendStatus(404);
});

router.post("/", async (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedDiaryEntry = await diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    } catch (e: unknown) {
        let errorMessage;
        try {
            errorMessage = e instanceof Error ? JSON.parse(e.message) : "Unknown Error";
        } catch {
            errorMessage = e instanceof Error ? e.message : "Unknown Error";
        }
        res.status(400).send({ error:errorMessage });
    }
});

export default router;