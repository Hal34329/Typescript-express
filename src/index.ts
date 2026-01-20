import express from "express";
import diaryRouter from "./routes/diaries.js";

const app = express();
app.use(express.json()); // Middleware que transforma la req.body a un JSON

const PORT = 3000;

app.get("/ping", (_req, res) => {
    console.log("Someone pinged here!! " + new Date().toLocaleDateString());
    res.send("pong");    
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});