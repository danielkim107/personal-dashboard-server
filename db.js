const express = require('express')
const morgan = require('morgan')
const {Sequelize, DataTypes} = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('short'))
app.use(express.static('./public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

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

// CRUD API for main page
app.get('/', (req, res) => res.json({ message: 'Hello World' }))

// User Create (POST)
app.post('/user', async (req, res) => {
	const newUser = User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.email
	}).then((user) => res.status(201).send(user)).catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
	res.json({
		user: newUser
	}) // Returns the new user that is created in the database
})

// User Read (GET)
app.get('/user', async(req, res) => {
	const users = await User.findAll();
	res.send(users);
})

app.listen(3000, () => console.log(`Server listening on 3000!`))