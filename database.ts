import { DataTypes } from "sequelize";

const Sequelize = require('sequelize');

//create sequilize instance
const sequelize = new Sequelize("Task-Api", "SajakShrestha", "sajakPass", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false
})

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    task: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
    }
})

export { sequelize, Task };