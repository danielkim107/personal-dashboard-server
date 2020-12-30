const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient({
	host: 'redis',
	port: 6379,
	
});
const app = express();

app.use(morgan('short'));
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(session({
	store: new redisStore({client: client, ttl : 260}),
	secret: 'mySecret',
	resave: false,
	saveUninitialized: true,
	loggedIn: false,
	userId: null
}));

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
	if (req.session.loggedIn) {
		res.send('Hello World');
	} else {
		res.status(400).send({message: 'Please login to see the page'});
	}
})

app.get('/restartDb', (req, res) => {
	sequelize.sync({ force: true });
	res.send('DB를 리셋했습니다.');
})

// Login/Authentication API
app.post('/auth', async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		let user = await User.findOne({where: {username: username, password: password}, attributes: ['id', 'username']});
		if (user === null) {
			res.status(400).send({message: 'Incorrect username and/or password!'});
		} else {
			req.session.loggedIn = true;
			req.session.userId = user.id;
			res.status(200).send({message: 'User has been authenticated.', user: user});
		}
	} else {
		res.status(400).send({message: 'Please enter Username and Password.'});
	}
});
app.get('/logout', (req, res) => {
	req.session.loggedIn = false;
	req.session.userId = null;
	res.status(204).send({message: 'User has been logged out.'});
})


// Entry API
app.get('/entry', (req, res) => {
	const limit = req.query.limit;
	const page = req.query.page;
	let offset = 0;
	Entry.findAndCountAll().then((data) => {
		offset = limit * (page - 1);
		Entry.findAll({
			attributes: ['id', 'title', 'createdAt'],
			order: [
				['id', 'DESC'],
			],
			include: [{model: User, attributes: ['id', 'username']}],
			limit: limit,
			offset: offset
		}).then((entries) => {
			res.status(200).send({data: entries, count: data.count});
		})
	});
});
app.get('/entry/:id', async (req, res) => {
	const entry = await Entry.findByPk(parseInt(req.params.id));
	if (entry === null) {
		res.status(200).send({});
	} else {
		res.status(200).send(entry);
	}
});
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
app.get('/random', async (req, res) => {
	const entry = await Entry.create({
		userId: 1,
		content: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
		title: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
	});
	res.status(201).send({
		entry: entry
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

// User API
app.get('/user', async (req, res) => {
	let users = await User.findAll({
		attributes: ['id', 'username'],
		order: [
			['id', 'DESC'],
		],
	});

	res.status(200).send(users);
});
app.post('/user', async (req, res) => {
	const newUser = await User.create({
		username: req.body.username,
		password: req.body.password
	});

	res.status(201).send({
		message: 'User has been created!',
		user: newUser
	});
});
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