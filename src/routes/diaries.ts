import express  from "express";
import * as diaryServices from "../services/diaryServices.js";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/full", (_req, res) => {
    res.send(diaryServices.getEntries());
});

router.get("/:id", (req, res) => {
    const diary = diaryServices.findById(Number(req.params.id));
    return (diary !== null)
        ? res.send(diary)
        : res.sendStatus(404);
});

router.post("/", (req, res) => {
    try {
        // const { date, weather, visibility, comment } = req.body;

        const newDiaryEntry = toNewDiaryEntry(req.body);

        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);

        res.json(addedDiaryEntry);
    } catch (e) {
        if(e instanceof Error){
            res.status(400).send(e.message);
            res.status(400).send((e as Error).message);
        }
        else {
            res.status(400).send("Unknown error");
        }
        // También podría pasarlo como res.status(400).send((e as Error).message); si estoy completamente seguro de que es un error
    }
});

export default router;