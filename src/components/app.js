import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const modelRoutes = {
	auth: require('./routes/auth'),
	entry: require('./routes/entry'),
	user: require('./routes/user'),
};

const app = express();

app.use(morgan('short'));
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: true}));

app.get('/', (req, res) => {
	res.send('Hello World');
});

for (const [routeName, routeController] of Object.entries(modelRoutes)) {
	if (routeController.getList) {
		app.get(`/api/${routeName}`, routeController.getList);
	}
	if (routeController.getById) {
		app.get(`/api/${routeName}/:id`, routeController.getById);
	}
	if (routeController.create) {
		app.post(`/api/${routeName}`, routeController.create);
	}
	if (routeController.update) {
		app.put(`/api/${routeName}/:id`, routeController.update);
	}
	if (routeController.remove) {
		app.delete(`/api/${routeName}/:id`, routeController.remove);
	}
	if (routeController.login) {
		app.post(`/api/${routeName}/login`, routeController.login);
	}
	if (routeController.reset) {
		app.get(`/api/${routeName}/reset`, routeController.reset);
	}
}

module.exports = app;