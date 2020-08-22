const express = require('express')
const morgan = require('morgan')
const { Sequelize, DataTypes } = require('sequelize')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('short'))
app.use(express.static('./public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost'
});

sequelize.authenticate().then(() => {

    console.log('Connection has been established successfully.');

}).
    catch((err) => {

        console.error('Unable to connect to the database:', err);

    });

const User = sequelize.define('User', {
    email: {
        allowNull: false,
        isEmail: true,
        type: DataTypes.STRING
    },
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

const Article = sequelize.define('Article', {
    author: {
        references: {
            key: 'id',
            model: User
        },
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.TEXT
    },
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.TEXT
    }
})

// Routing HTML API's
app.get('/', (req, res) => {

    res.sendFile('./public/main.html', { root: __dirname });

})

app.get('/restartDb', (req, res) => {
	sequelize.sync({ force: true });
	res.send('DB를 리셋했습니다.');
})

app.get('/createUser', (req, res) => {

    res.sendFile('./public/create_form.html', { root: __dirname });

})

app.get('/createArticle', (req, res) => {

    res.sendFile('./public/create_article.html', { root: __dirname })

});

// Article Get (READ)
app.get('/article', async (req, res) => {

    const articles = await Article.findAll();

    res.status(200).send(articles);
});

// User Create (POST)
app.post('/user', async (req, res) => {

    const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    res.status(201).send({
        message: 'User has been created!',
        user: newUser
    });
})

// User Read (GET)
app.get('/user', async (req, res) => {

    const users = await User.findAll();

    res.status(200).send(users);
})

// Article Create (POST)
app.post('/article', async (req, res) => {
    const newArticle = await Article.create({
        author: req.body.author,
        content: req.body.content,
        title: req.body.title
    });
    res.status(201).send(newArticle)
})

app.listen(3000, () => console.log('Server listening on 3000!'))