import { Op } from 'sequelize';
import { sequelize } from '../../sequelize';
import { getParamId, getDefaultStudentSlotInfo } from '../utils';

const Slot = sequelize.models.slot;

async function getList(req, res) {
	const start = req.query.start;
	const end = req.query.end;

	const slots = await Slot.findAll({
		where: {
			date: {
				[Op.gte]: start,
				[Op.lte]: end,
			},
		},
		attributes: ['id', 'date', 'studentInfo',],
		order: [
			['date', 'ASC'],
		],
	});
	res.status(200).send(slots);
};

async function getById(req, res) {
	const id = getParamId(req.params);
	const slot = await Slot.findOne({ 
		where: { id: id },
		attributes: ['date', 'studentInfo', 'totalAmount', 'memo',],
	});
	if (slot) {
		res.status(200).send(slot);
	} else {
		res.status(400).send({ message: 'Slot not found. '});
	}
};

async function getByDate(req, res) {
	const teacherId = req.query.teacherId;
	const date = req.query.date;

	const [studentInfo, totalAmount] = await getDefaultStudentSlotInfo(teacherId, date);

	const [slot, _] = await Slot.findOrCreate({
		where: { 
			teacherId: teacherId,
			date: date,
		},
		defaults: {studentInfo: studentInfo, totalAmount: totalAmount, date: date, teacherId: teacherId},
		attributes: ['id', 'date', 'studentInfo', 'totalAmount',],
	});

	res.status(200).send({id: slot.id});
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