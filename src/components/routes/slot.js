import { sequelize } from '../../sequelize';
import { getParamId } from '../utils';

const Slot = sequelize.model.slot;

async function getList(req, res) {
	const users = await Slot.findAll({
		attributes: ['id', 'time', 'startAt',],
		order: [
			['id', 'DESC'],
		],
	});
	res.status(200).send(users);
};

async function getById(req, res) {
	const id = getParamId(req.params);
	const user = await Slot.findByPk(id);
	if (entry) {
		res.status(200).send(user);
	} else {
		res.status(400).send({ message: 'User not found. '});
	}
};

async function create(req, res) {
	await Slot.create(req.body);
	res.status(201).end();
};

async function update(req, res) {
	const id = getParamId(req.params);
	await Slot.update(req.body, { where: { id: id } });
	res.status(200).end();
};

async function remove(req, res) {
	const id = getParamId(req.params);
	await Slot.destroy({ where: { id: id } });
	res.status(204).end();
};

module.exports = {
	getList,
	getById,
	create,
	update,
	remove,
};