import { sequelize } from '../sequelize';

function getParamId (params) {
	return parseInt(params.id);
};

async function getModelCount(model) {
	let data = await model.findAndCountAll();
	return data.count;
};

async function getDefaultStudentSlotInfo(teacherId, date) {
	const today = new Date(date).getDay();
	const Student = sequelize.models.student;
	let studentHours = [];
	let totalAmount = 0;
	const students = await Student.findAll({
		where: { teacherId: teacherId },
		attributes: ['id', 'name', 'defaultHour', 'price', 'tutorDays',],
		order: [
			['name', 'DESC'],
		],
	});
	students.forEach(student => {
		if (student.tutorDays.includes(today)) {
			studentHours.push({studentId: student.id, hours: student.defaultHour});
			totalAmount += student.defaultHour * student.price;
		} else {
			studentHours.push({studentId: student.id, hours: 0});
		}
	});
	return [studentHours, totalAmount];
};

module.exports = {
	getParamId,
	getModelCount,
	getDefaultStudentSlotInfo,
};