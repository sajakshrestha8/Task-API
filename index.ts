import express from "express";
import { Request, Response } from "express";
import { where } from "sequelize";

const app = express();
const Port = 8001;
const fs = require('fs');
const taskFile = 'task.json';

//middleware
app.use(express.json());

//create a new file

//route for getting all task 
app.get('/tasks', async(req: Request, res: Response) => {
    const task = fs.readFileSync(taskFile);
    res.json(JSON.parse(task));
})

//route to get task by Id
app.get('/tasks/:id', async(req: Request, res: Response) => {
})

//route for adding the task
app.post('/tasks', async(req: Request, res: Response) => {
    const { id, task, status } = req.body;
    
    const data = await fs.readFile(taskFile, 'utf8');

    if(data === undefined){
        fs.writeFile(taskFile, '[]', (err: any) => console.log(err));
    }
    const fileTasks = data.trim() ? JSON.parse(data) : [] ;
    const addedTask = await fs.appendFile(fileTasks, 
       JSON.stringify( {
            "id": id,
            "task": task,
            "status": status
        }), (err: any) => {
            if(err){
                console.log(err)
            }
        })

    res.json({
        "message": "New task added to the file successfully",
        "newTask": addedTask,
    })
})

//route for updating the task
app.put("/tasks/:id", async(req: Request, res: Response) => {
})

//route for toggling the status
app.patch("/tasks/:id", async(req: Request, res: Response) => {
})

//Delete the task by Id
app.delete("/tasks/:id", async(req: Request, res: Response) => {
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})