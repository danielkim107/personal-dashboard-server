const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
    dialect: 'postgres',
	host: '127.0.0.1',
	port: 5432
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});