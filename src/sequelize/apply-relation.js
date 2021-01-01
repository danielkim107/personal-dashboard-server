function applyRelation(sequelize) {
	const { entry, user, slot } = sequelize.models;
	// Entry Relations
	entry.belongsTo(user, { foreignKey: 'userId' });

	// Slot Relations
	slot.belongsTo(user, { foreignKey: 'adminId' });
	slot.belongsTo(user, { foreignKey: 'studentId' });
}

module.exports = { applyRelation };