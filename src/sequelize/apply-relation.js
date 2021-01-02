function applyRelation(sequelize) {
	sequelize.define('Student_Slots', {}, { timestamps: false });
	const { student, teacher, slot } = sequelize.models;
	// Student Relations
	student.belongsTo(teacher, { foreignKey: 'teacherId', as: 'teacher' });
	student.belongsToMany(slot, { through: 'Student_Slots'});

	// Teacher Relations
	teacher.hasMany(student, { foreignKey: 'teacherId', as: 'students' });

	// Slot Relations
	slot.belongsTo(teacher, { foreignKey: 'teacherId', as: 'teacher' });
	slot.belongsToMany(student, { through: 'Student_Slots' });
}

module.exports = { applyRelation };