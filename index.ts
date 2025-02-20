import express from "express";
import { Request, Response } from "express";
import sequelize from "./database";

const app = express();
const Port = 8001;

//db connection 
async function databaseConnection() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database failed to build the connection", error)
    }
}

databaseConnection();

//route for adding the task
app.post('/tasks', (req: Request, res: Response) => {
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})