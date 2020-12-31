function applyRelation(sequelize) {
	const { entry, user } = sequelize.models;
	entry.belongsTo(user, {foreignKey: 'userId'});
}

module.exports = { applyRelation };