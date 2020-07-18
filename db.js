const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch(err => {
	console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		isEmail: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	}
})

const Article = sequelize.define('Article', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	author: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id',
		}
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
	}
})

sequelize.sync({ force: true });
// console.log('Table for the User model was created!')