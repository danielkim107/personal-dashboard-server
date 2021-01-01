module.exports = (sequelize, DataTypes) => {
	const slot = sequelize.define('slot', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		time: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		startAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	});
	return slot;
}