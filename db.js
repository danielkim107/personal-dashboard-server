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

// Routing HTML API's
app.get('/', (req, res) => {
	res.sendFile('./public/main.html', {root: __dirname});
})

app.get('/createUser', (req, res) => {
	res.sendFile('./public/create_form.html', {root: __dirname});
})

// Article Get (READ)
app.get('/article', async (req, res) => {
	const articles = await Article.findAll();
	res.status(200).send(articles);
});

// User Create (POST)
app.post('/user', async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	res.status(201).send({
		message: 'User has been created!'
	});
})

app.listen(3000, () => console.log(`Server listening on 3000!`))