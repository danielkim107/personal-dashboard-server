import { sequelize } from '../../sequelize';

const User = sequelize.models.user;

async function getList(req, res) {
	const users = await User.findAll({
		attributes: ['id', 'username'],
		order: [
			['id', 'DESC'],
		],
	});
	res.status(200).send(users);
};

async function getById(req, res) {
	const id = parseInt(req.params.id);
	const user = await User.findByPk(id);
	if (entry) {
		res.status(200).send(user);
	} else {
		res.status(400).send({ message: 'User not found. '});
	}
};

async function create(req, res) {
	const body = {
		username: req.body.username,
		password: req.body.password,
	};
	await User.create(body);
	res.status(201).end();
};

async function update(req, res) {
	const id = parseInt(req.params.id);
	const body = {
		username: req.body.usrename,
		password: req.body.password,
	};
	await User.update(body, { where: { id: id } });
	res.status(200).end();
};

async function remove(req, res) {
	const id = parseInt(req.params.id);
	await User.destroy({ where: { id: id } });
	res.status(204).end();
};

module.exports = {
	getList,
	getById,
	create,
	update,
	remove,
};