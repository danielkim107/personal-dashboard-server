const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();

app.use(morgan('short'));
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'db'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	username: {
		allowNull: false,
		type: DataTypes.TEXT
	},
	password: {
		allowNull: false,
		type: DataTypes.TEXT
	}
});
	
const Entry = sequelize.define('entry', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	title: {
		allowNull: false,
		type: DataTypes.STRING
	},
	content: {
		allowNull: false,
		type: DataTypes.STRING
	}
});

Entry.belongsTo(User, {foreignKey: 'userId'});

// Routing HTML API's
app.get('/', (req, res) => {

    res.send('Hello World');

})

app.get('/restartDb', (req, res) => {
	sequelize.sync({ force: true });
	res.send('DB를 리셋했습니다.');
})

// Article Get (READ)
app.get('/entry', async (req, res) => {
    let entries = await Entry.findAll({
		attributes: ['id', 'title', 'createdAt'],
		order: [
			['id', 'DESC'],
		],
		include: [{model: User, attributes: ['id', 'username']}]
	});

    res.status(200).send(entries);
});

app.get('/user', async (req, res) => {
	let users = await User.findAll({
		attributes: ['id', 'username'],
		order: [
			['id', 'DESC'],
		],
	});

	res.status(200).send(users);
});

app.get('/entry/:id', async (req, res) => {
	const entry = await Entry.findByPk(parseInt(req.params.id));
	if (entry === null) {
		res.status(200).send({});
	} else {
		res.status(200).send(entry);
	}
});

// User Create (POST)
app.post('/entry', async (req, res) => {
	const newEntry = await Entry.create({
        userId: req.body.userId,
        content: req.body.content,
        title: req.body.title
	});
	
    res.status(201).send({
        message: 'Entry has been created!',
        entry: newEntry
    });
});

app.post('/user', async (req, res) => {
	console.log(req);
	const newUser = await User.create({
		username: req.body.username,
		password: req.body.password
	});

	res.status(201).send({
		message: 'User has been created!',
		user: newUser
	});
});

app.put('/entry/:id', async (req, res) => {
	let entry = await Entry.findByPk(parseInt(req.params.id));
	entry.userId = req.body.userId;
	entry.content = req.body.content;
	entry.title = req.body.title;
	entry.save();

	res.status(200).send({
		message: 'Entry has been updated.',
		entry: entry
	});
});

app.delete('/entry/:id', async (req, res) => {
	const entry = await Entry.findByPk(parseInt(req.params.id));
	entry.destroy();

	res.status(204).send({
		message: 'Entry has been deleted.',
	});
});

// User Create (POST)
app.put('/user/:id', async (req, res) => {
	let user = await User.findByPk(parseInt(req.params.id));
	user.username = req.body.username;
	user.password = req.body.password;
	user.save();

    res.status(201).send({
        message: 'User has been updated.',
        user: user
    });
});

app.delete('/user/:id', async (req, res) => {
	const user = await User.findByPk(parseInt(req.params.id));
	user.destroy();

	res.status(204).send({
		message: 'User has been deleted.',
	});
});

app.listen(4000, () => console.log('Server listening on 4000!'));