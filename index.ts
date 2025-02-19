import express from "express";
import { Request, Response } from "express";
const app = express();
const Port = 8000;
const tasks = ["I am working", "I am sleeping", "I am eating"];

app.get("/tasks", (req: Request, res: Response) => {
    res.send(tasks);
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})