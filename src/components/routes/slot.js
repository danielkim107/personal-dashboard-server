import { Op } from 'sequelize';
import { sequelize } from '../../sequelize';
import { getParamId, getDefaultStudentSlotInfo } from '../utils';

const Slot = sequelize.models.slot;

async function getList(req, res) {
	const slots = await Slot.findAll({
		attributes: ['id', 'date', 'studentHours', 'totalAmount',],
		order: [
			['startAt', 'DESC'],
		],
	});
	res.status(200).send(slots);
};

async function getById(req, res) {
	const id = getParamId(req.params);
	const slot = await Slot.findByPk(id);
	if (entry) {
		res.status(200).send(slot);
	} else {
		res.status(400).send({ message: 'Slot not found. '});
	}
};

async function getByDate(req, res) {
	const teacherId = req.query.teacherId;
	const date = req.query.date;

	const [studentHours, totalAmount] = await getDefaultStudentSlotInfo(teacherId, date);

	const [slot, created] = await Slot.findOrCreate({
		where: { 
			teacherId: teacherId,
			date: {
				[Op.eq]: date.concat(' 00:00:00.000 +00:00'),
			} ,
		},
		defaults: {studentHours: studentHours, totalAmount: totalAmount, date: date, teacherId: teacherId},
	});

	if (created) {
		res.status(201).send(slot);
	} else {
		res.status(200).send(slot);
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
	getByDate,
	create,
	update,
	remove,
};