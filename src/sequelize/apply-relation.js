function applyRelation(sequelize) {
	const { student, teacher, slot } = sequelize.models;
	// Student Relations
	student.belongsTo(teacher, { foreignKey: 'teacherId', as: 'teacher' });

	// Teacher Relations
	teacher.hasMany(student, { foreignKey: 'teacherId', as: 'students' });

	// Slot Relations
	slot.belongsTo(teacher, { foreignKey: 'teacherId', as: 'teacher' });
}

module.exports = { applyRelation };