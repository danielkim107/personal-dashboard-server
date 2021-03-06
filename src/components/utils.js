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
	let studentInfo = [];
	let totalAmount = 0;
	const students = await Student.findAll({
		where: { teacherId: teacherId },
		attributes: ['id', 'name', 'defaultHour', 'defaultTimeStart', 'defaultTimeEnd', 'price', 'tutorDays',],
		order: [
			['defaultTimeStart', 'ASC'],
		],
	});
	students.forEach(student => {
		if (student.tutorDays.includes(today)) {
			studentInfo.push({
				studentId: student.id,
				timeRange: [student.defaultTimeStart, student.defaultTimeEnd],
				hours: student.defaultHour, 
				price: student.price,
				name: student.name,
			});
			totalAmount += student.defaultHour * student.price;
		} else {
			studentInfo.push({
				studentId: student.id,
				timeRange: ['', ''],
				hours: 0, 
				price: student.price,
				name: student.name,
			});
		}
	});
	return [studentInfo, totalAmount];
};

module.exports = {
	getParamId,
	getModelCount,
	getDefaultStudentSlotInfo,
};