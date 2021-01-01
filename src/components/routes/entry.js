import { sequelize } from '../../sequelize';
import { getPaginationData } from '../utils';

const Entry = sequelize.models.entry;
const User = sequelize.models.user;

async function getList(req, res) {
	const paginationData = getPaginationData(req.query);
	const countData = await Entry.findAndCountAll();
	const entries = await Entry.findAll({
		attributes: [
			'id', 'title', 'createdAt'
		],
		order: [
			['id', 'DESC'],
		],
		include: [{model: User, attributes: ['id', 'username']}],
		limit: paginationData.limit,
		offset: paginationData.offset,
	});
	res.status(200).send({data: entries, count: countData.count});
};

async function getById(req, res) {
	const id = parseInt(req.params.id);
	const entry = await Entry.findByPk(id);
	if (entry) {
		res.status(200).send(entry);
	} else {
		res.status(400).send({ message: 'Entry not found. '});
	}
};

async function create(req, res) {
	const body = {
		userId: req.body.userId,
		content: req.body.content,
		title: req.body.title,
	};
	await Entry.create(body);
	res.status(201).end();
};

async function update(req, res) {
	const id = parseInt(req.params.id);
	const body = {
		userId: req.body.userId,
		content: req.body.content,
		title: req.body.title,
	};
	await Entry.update(body, { where: { id: id } });
	res.status(200).end();
};

async function remove(req, res) {
	const id = parseInt(req.params.id);
	await Entry.destroy({ where: { id: id } });
	res.status(204).end();
};

module.exports = {
	getList,
	getById,
	create,
	update,
	remove,
};