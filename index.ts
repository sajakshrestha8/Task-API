import express from "express";
import { Request, Response } from "express";
import { sequelize, Task } from "./database";
import { where } from "sequelize";

const app = express();
const Port = 8001;

//middleware
app.use(express.json());

//db connection 
async function databaseConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database failed to build the connection", error)
    }
}

databaseConnection();

//route for getting all task 
app.get('/tasks', async(req: Request, res: Response) => {
    const allTask = await Task.findAll();
    res.status(200).json(allTask);
})

//route to get task by Id
app.get('/tasks/:id', async(req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if(!task){
        res.status(404).send("Task not found");
    }
    res.status(200).json(task);
})

//route for adding the task
app.post('/tasks', async(req: Request, res: Response) => {
    const { task, status } = req.body;

    const newTask = await Task.create({ task: task, status: status });

    if(!task){
        res.status(400).send("Task can't be empty")
    }
    res.status(200).json(newTask);
})

//route for updating the task
app.put("/tasks/:id", async(req: Request, res: Response) => {
    const taskId = req.params.id;
    const { task, status } = req.body;

    const existingTask = await Task.findByPk(taskId);
    
    if(!existingTask){
        res.status(404).send("Task not found");
    }

    const updatedTask = await existingTask.update({ task, status });
    res.status(200).json(updatedTask);
})

//route for toggling the status
app.patch("/tasks/:id", async(req: Request, res: Response) => {
    const taskId = req.params.id;

    const existingTask = await Task.findByPk(taskId);

    if(!existingTask){
        res.status(404).send("Task not found");
    }

    let newStatus;
    if(existingTask.status === "pending"){
        newStatus = "completed";
    }else if(existingTask.status === "completed"){    
        newStatus = "pending";
    }else{
        res.status(400).send("No such status found");
    }
    
    existingTask.status = newStatus;
    await existingTask.save();

    res.status(200).json({
        "messege": "status toggled successfully", existingTask
    });
})

//Delete the task by Id
app.delete("/tasks/:id", async(req: Request, res: Response) => {
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId);

    const deletedTask = await Task.destroy({
        where: {
            id: taskId,
        }
    });
    
    if(deletedTask === 0){
        res.status(404).send("No such task found");
    }
    res.status(200).json({
        "messege": "Task has been deleted",
        "task": task
    });
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})