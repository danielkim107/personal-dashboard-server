import { sequelize } from '../../sequelize';

const Teacher = sequelize.models.teacher;

async function getList(req, res) {
	const teachers = await Teacher.findAll({
		attributes: ['id', 'name',],
		order: [
			['name', 'DESC'],
		],
	});
	res.status(200).send(teachers);
};

async function getById(req, res) {
	const id = parseInt(req.params.id);
	const teacher = await Teacher.findByPk(id);
	if (teacher) {
		res.status(200).send(teacher);
	} else {
		res.status(400).send({ message: 'Teacher not found. '});
	}
};

async function create(req, res) {
	await Teacher.create(req.body);
	res.status(201).end();
};

async function update(req, res) {
	const id = parseInt(req.params.id);
	await Teacher.update(req.body, { where: { id: id } });
	res.status(200).end();
};

async function remove(req, res) {
	const id = parseInt(req.params.id);
	await Teacher.destroy({ where: { id: id } });
	res.status(204).end();
};

module.exports = {
	getList,
	getById,
	create,
	update,
	remove,
};