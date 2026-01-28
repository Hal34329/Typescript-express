import express  from "express";
import * as diaryServices from "../services/diaryServices.js";
import toNewDiaryEntry from "../utils.js";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/full", async (_req, res) => {
    try{
        // res.send(diaryServices.getEntries());
        const entries = await diaryServices.getEntries();
        res.json(entries);
    } catch (e: unknown) {
        // res.status(500).send("Error al obtener las entradas");
        // if(e instanceof Error){
        //     res.status(400).send(`Error: ${e.message}`);
        // }
        // else {
        //     res.status(400).send("Unknown error");
        // }
        const errorMessage = e instanceof Error ? e.message : "Unknown Error";
        res.status(500).json({ error: errorMessage });
    }
});

// router.get("/:id", (req, res) => {
//     const diary = diaryServices.findById(Number(req.params.id));
//     return (diary !== null)
//         ? res.send(diary)
//         : res.sendStatus(404);
// });

router.get("/:id", async (req, res) => {
    const diary = diaryServices.findById(Number(req.params.id));
    return (diary!==null) ? res.send(diary) : res.sendStatus(404);
});

// router.post("/", (req, res) => {
//     try {
//         const newDiaryEntry = toNewDiaryEntry(req.body);

//         const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);

//         res.json(addedDiaryEntry);
//     } catch (e) {
//         if(e instanceof Error){
//             res.status(400).send(e.message);
//             // res.status(400).send((e as Error).message);
//         }
//         else {
//             res.status(400).send("Unknown error");
//         }
//     }
// });

router.post("/", async (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Unknown Error";
        res.status(400).send({ error:errorMessage });
    }
});

export default router;