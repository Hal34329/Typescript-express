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
    // res.send("Saving a diary!");
    const { date, weather, visibility, comment } = req.body;

    const newDiaryEntry = diaryServices.addEntry(
        date,
        weather,
        visibility,
        comment,
    );

    res.json(newDiaryEntry);
});

export default router;