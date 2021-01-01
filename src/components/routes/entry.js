import { sequelize } from '../../sequelize';
import { getPaginationData, getModelCount, getParamId } from '../utils';

const Entry = sequelize.models.entry;
const User = sequelize.models.user;

async function getList(req, res) {
	const paginationData = getPaginationData(req.query);
	const count = await getModelCount(Entry);
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
	res.status(200).send({data: entries, count: count});
};

async function getById(req, res) {
	const id = getParamId(req.params);
	const entry = await Entry.findByPk(id);
	if (entry) {
		res.status(200).send(entry);
	} else {
		res.status(400).send({ message: 'Entry not found. '});
	}
};

async function create(req, res) {
	const entry = await Entry.create(req.body);
	res.status(201).send(entry);
};

async function update(req, res) {
	const id = getParamId(req.params);
	const [count, entry] = await Entry.update(req.body, { where: { id: id } });
	res.status(200).send(count);
};

async function remove(req, res) {
	const id = getParamId(req.params);
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