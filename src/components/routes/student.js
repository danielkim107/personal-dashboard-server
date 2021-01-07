import { sequelize } from '../../sequelize';

const Student = sequelize.models.student;

async function getList(req, res) {
	const teacherId = req.query.teacherId;
	const students = await Student.findAll({
		where: { teacherId: teacherId },
		attributes: ['id', 'name', 'tutorDays',],
		order: [
			['name', 'DESC'],
		],
	});
	res.status(200).send(students);
};

async function getById(req, res) {
	const id = parseInt(req.params.id);
	const student = await Student.findByPk(id, {
		attributes: ['name', 'defaultHour', 'defaultTimeStart', 'defaultTimeEnd', 'price', 'tutorDays',],
	});
	if (student) {
		res.status(200).send(student);
	} else {
		res.status(400).send({ message: 'Student not found. '});
	}
};

async function create(req, res) {
	await Student.create(req.body);
	res.status(201).end();
};

async function update(req, res) {
	const id = parseInt(req.params.id);
	await Student.update(req.body, { where: { id: id } });
	res.status(200).end();
};

async function remove(req, res) {
	const id = parseInt(req.params.id);
	await Student.destroy({ where: { id: id } });
	res.status(204).end();
};

module.exports = {
	getList,
	getById,
	create,
	update,
	remove,
};