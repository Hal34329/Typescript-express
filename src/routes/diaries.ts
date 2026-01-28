import express  from "express";
import * as diaryServices from "../services/diaryServices.js";
import toNewDiaryEntry from "../utils.js";

const router = express.Router();

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
        if(e instanceof Error) {
            try {
                const parsed = JSON.parse(e.message);
                errorMessage = Array.isArray(parsed)
                    ? parsed.map(err => ({ ...err, message: err.message.replace(/"/g, " ") }))
                    : parsed;
            } catch {
                errorMessage = e.message;
            }
        } else {
            errorMessage = "Unknown Error";
        }
        res.status(400).send({ error:errorMessage });
    }
});

// Nuevas rutas
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if(isNaN(id))
            return res.status(400).send({ error: "Invalid ID format" });

        const deleted = await diaryServices.deleteEntry(id);

        if(deleted)
            return res.status(204).send();
        else
            return res.status(404).send({ error: "Entry Not Found" });
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Unknown Error";
        return res.status(500).json({ error: errorMessage });
    }
});

export default router;