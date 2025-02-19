import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const task = sequelize.define('Task', {
    task: DataTypes.STRING,
    status: DataTypes.STRING,
})
